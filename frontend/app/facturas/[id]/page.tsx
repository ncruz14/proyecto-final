"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, Download, CreditCard, FileDown } from "lucide-react"

// Datos de ejemplo para la factura
const facturaDetalle = {
  id: 1,
  numeroFactura: "F-2025-04-12345",
  periodo: "Abril 2025",
  fechaEmision: "2025-04-01",
  fechaVencimiento: "2025-05-15",
  cliente: {
    nombre: "Juan Pérez",
    direccion: "Calle 123 #45-67, El Pital",
    numeroCliente: "12345678",
  },
  consumo: {
    actual: 13,
    anterior: 12,
    promedio: 12.5,
  },
  detalles: [
    { concepto: "Cargo fijo", valor: 15000 },
    { concepto: "Consumo (13 m³)", valor: 26000 },
    { concepto: "Alcantarillado", valor: 4000 },
  ],
  subtotal: 45000,
  descuentos: 0,
  total: 45000,
  estado: "pendiente",
}

export default function FacturaDetalle({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const handlePagar = () => {
    setIsLoading(true)
    // Simulación de pago
    setTimeout(() => {
      setIsLoading(false)
      router.push("/pago/confirmacion")
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-3xl mx-auto">
        <Link href="/consulta" className="flex items-center text-sm text-gray-600 hover:text-blue-600 mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Volver a mis facturas
        </Link>

        <Card>
          <CardHeader className="pb-4">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center">
              <div>
                <CardTitle className="text-2xl">Factura #{facturaDetalle.numeroFactura}</CardTitle>
                <CardDescription>Periodo: {facturaDetalle.periodo}</CardDescription>
              </div>
              <Button variant="outline" size="sm" className="mt-4 md:mt-0">
                <Download className="h-4 w-4 mr-2" />
                Descargar PDF
              </Button>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-medium text-gray-500 mb-2">Información del Cliente</h3>
                <p className="font-medium">{facturaDetalle.cliente.nombre}</p>
                <p className="text-gray-600">{facturaDetalle.cliente.direccion}</p>
                <p className="text-gray-600">Cliente #: {facturaDetalle.cliente.numeroCliente}</p>
              </div>
              <div>
                <h3 className="font-medium text-gray-500 mb-2">Información de la Factura</h3>
                <div className="grid grid-cols-2 gap-2">
                  <p className="text-gray-600">Fecha de emisión:</p>
                  <p>{facturaDetalle.fechaEmision}</p>
                  <p className="text-gray-600">Fecha de vencimiento:</p>
                  <p>{facturaDetalle.fechaVencimiento}</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-medium text-gray-500 mb-2">Consumo de Agua</h3>
              <div className="grid grid-cols-3 gap-4 bg-gray-100 p-4 rounded-md">
                <div className="text-center">
                  <p className="text-gray-600 text-sm">Lectura Anterior</p>
                  <p className="font-bold text-lg">{facturaDetalle.consumo.anterior} m³</p>
                </div>
                <div className="text-center">
                  <p className="text-gray-600 text-sm">Lectura Actual</p>
                  <p className="font-bold text-lg">{facturaDetalle.consumo.actual} m³</p>
                </div>
                <div className="text-center">
                  <p className="text-gray-600 text-sm">Consumo</p>
                  <p className="font-bold text-lg">
                    {facturaDetalle.consumo.actual - facturaDetalle.consumo.anterior} m³
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-medium text-gray-500 mb-2">Detalle de Cargos</h3>
              <div className="space-y-2">
                {facturaDetalle.detalles.map((item, index) => (
                  <div key={index} className="flex justify-between">
                    <p>{item.concepto}</p>
                    <p>$ {item.valor.toLocaleString()}</p>
                  </div>
                ))}
                <Separator className="my-2" />
                <div className="flex justify-between font-medium">
                  <p>Subtotal</p>
                  <p>$ {facturaDetalle.subtotal.toLocaleString()}</p>
                </div>
                {facturaDetalle.descuentos > 0 && (
                  <div className="flex justify-between text-green-600">
                    <p>Descuentos</p>
                    <p>- $ {facturaDetalle.descuentos.toLocaleString()}</p>
                  </div>
                )}
                <div className="flex justify-between text-lg font-bold">
                  <p>Total a Pagar</p>
                  <p>$ {facturaDetalle.total.toLocaleString()}</p>
                </div>
              </div>
            </div>
          </CardContent>

          <CardFooter className="flex flex-col sm:flex-row justify-between space-y-4 sm:space-y-0">
            <div className="text-gray-600">
              <p>
                Estado:{" "}
                <span
                  className={
                    facturaDetalle.estado === "pendiente" ? "text-yellow-600 font-medium" : "text-green-600 font-medium"
                  }
                >
                  {facturaDetalle.estado === "pendiente" ? "Pendiente de pago" : "Pagada"}
                </span>
              </p>
            </div>
            <div className="flex space-x-3">
              {facturaDetalle.estado === "pendiente" ? (
                <Button onClick={handlePagar} disabled={isLoading}>
                  <CreditCard className="h-4 w-4 mr-2" />
                  {isLoading ? "Procesando..." : "Pagar Ahora"}
                </Button>
              ) : (
                <Button variant="outline">
                  <FileDown className="h-4 w-4 mr-2" />
                  Descargar Comprobante
                </Button>
              )}
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
