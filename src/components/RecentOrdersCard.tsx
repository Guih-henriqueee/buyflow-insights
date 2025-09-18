import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MoreHorizontal, Eye } from "lucide-react"
import { cn } from "@/lib/utils"

interface Order {
  id: string
  supplier: string
  category: string
  value: number
  status: "pendente" | "aprovado" | "entregue" | "cancelado"
  date: string
}

interface RecentOrdersCardProps {
  orders: Order[]
}

const statusConfig = {
  pendente: { label: "Pendente", variant: "secondary" as const },
  aprovado: { label: "Aprovado", variant: "default" as const },
  entregue: { label: "Entregue", variant: "default" as const },
  cancelado: { label: "Cancelado", variant: "destructive" as const },
}

export function RecentOrdersCard({ orders }: RecentOrdersCardProps) {
  return (
    <Card className="bg-gradient-card shadow-card">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Últimas Ordens de Compra</span>
          <Button variant="ghost" size="sm">Ver todas</Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {orders.map((order) => (
          <div key={order.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <p className="font-medium text-sm">{order.supplier}</p>
                <Badge 
                  variant={statusConfig[order.status].variant}
                  className={cn(
                    order.status === "entregue" && "bg-success text-success-foreground hover:bg-success/80"
                  )}
                >
                  {statusConfig[order.status].label}
                </Badge>
              </div>
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>{order.category}</span>
                <span className="font-semibold text-foreground">
                  R$ {order.value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">{order.date}</p>
            </div>
            <div className="flex items-center gap-2 ml-4">
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Eye className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}