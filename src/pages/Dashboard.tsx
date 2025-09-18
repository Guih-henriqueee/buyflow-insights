import { KPICard } from "@/components/KPICard"
import { RecentOrdersCard } from "@/components/RecentOrdersCard"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  DollarSign, 
  ShoppingCart, 
  Users, 
  TrendingUp,
  Package,
  Calendar
} from "lucide-react"
import { 
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell
} from "recharts"

// Mock data
const monthlySpendingData = [
  { month: 'Jan', valor: 45000 },
  { month: 'Fev', valor: 52000 },
  { month: 'Mar', valor: 48000 },
  { month: 'Abr', valor: 61000 },
  { month: 'Mai', valor: 58000 },
  { month: 'Jun', valor: 67000 },
]

const categoryData = [
  { category: 'Computadores', valor: 25000, color: '#3b82f6' },
  { category: 'Notebooks', valor: 18000, color: '#10b981' },
  { category: 'Hardware', valor: 12000, color: '#f59e0b' },
  { category: 'Periféricos', valor: 8000, color: '#ef4444' },
]

const supplierData = [
  { supplier: 'TechCorp', pedidos: 15 },
  { supplier: 'InfoSys', pedidos: 12 },
  { supplier: 'CompuMax', pedidos: 8 },
  { supplier: 'DigitalPro', pedidos: 6 },
]

const recentOrders = [
  {
    id: "ORD-001",
    supplier: "TechCorp Ltda",
    category: "Notebooks",
    value: 15000,
    status: "aprovado" as const,
    date: "15/09/2024"
  },
  {
    id: "ORD-002", 
    supplier: "InfoSys Solutions",
    category: "Computadores",
    value: 25000,
    status: "entregue" as const,
    date: "14/09/2024"
  },
  {
    id: "ORD-003",
    supplier: "CompuMax",
    category: "Periféricos",
    value: 3500,
    status: "pendente" as const,
    date: "13/09/2024"
  },
  {
    id: "ORD-004",
    supplier: "DigitalPro",
    category: "Hardware",
    value: 8000,
    status: "aprovado" as const,
    date: "12/09/2024"
  }
]

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Visão geral dos pedidos de compra e métricas principais</p>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <KPICard
          title="Total Gasto (Mês)"
          value="R$ 67.000"
          subtitle="setembro 2024"
          icon={DollarSign}
          trend={{ value: "15.3%", positive: true }}
          variant="primary"
        />
        <KPICard
          title="Pedidos Ativos"
          value="24"
          subtitle="8 pendentes"
          icon={ShoppingCart}
          trend={{ value: "8", positive: true }}
          variant="success"
        />
        <KPICard
          title="Fornecedores"
          value="12"
          subtitle="ativos este mês"
          icon={Users}
          variant="default"
        />
        <KPICard
          title="Categoria Top"
          value="Notebooks"
          subtitle="R$ 25.000"
          icon={Package}
          variant="success"
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Spending Trend Chart */}
        <Card className="bg-gradient-card shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              Tendência de Gastos (6 meses)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlySpendingData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "var(--radius)"
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="valor" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={2}
                  dot={{ fill: "hsl(var(--primary))", strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Category Breakdown */}
        <Card className="bg-gradient-card shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="w-4 h-4" />
              Gastos por Categoria
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ category, percent }: any) => `${category} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="valor"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Recent Orders */}
        <div className="lg:col-span-2">
          <RecentOrdersCard orders={recentOrders} />
        </div>

        {/* Top Suppliers */}
        <Card className="bg-gradient-card shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              Top Fornecedores
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={supplierData} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis type="number" stroke="hsl(var(--muted-foreground))" />
                <YAxis 
                  type="category" 
                  dataKey="supplier" 
                  stroke="hsl(var(--muted-foreground))"
                  width={80}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "var(--radius)"
                  }}
                />
                <Bar 
                  dataKey="pedidos" 
                  fill="hsl(var(--success))"
                  radius={[0, 4, 4, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}