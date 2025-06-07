"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Download, Home } from "lucide-react"

export default function Confirmacion() {
  const fechaPago = new Date().toLocaleDateString("es-CO", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })

  const numeroReferencia = "REF-" + Math.floor(Math.random() * 1000000000)

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <CheckCircle className="h-16 w-16 text-green-500" />
          </div>
          <CardTitle className="text-2xl">¡Pago Exitoso!</CardTitle>
          <CardDescription>Su pago ha sido procesado correctamente</CardDescription>
        </CardHeader>

        <CardContent>
          <div className="space-y-4">
            <div className="bg-gray-100 p-4 rounded-md">
              <div className="grid grid-cols-2 gap-2">
                <p className="text-gray-600">Monto pagado:</p>
                <p className="font-bold text-right">$ 45,000</p>

                <p className="text-gray-600">Factura:</p>
                <p className="text-right">F-2025-04-12345</p>

                <p className="text-gray-600">Fecha de pago:</p>
                <p className="text-right">{fechaPago}</p>

                <p className="text-gray-600">Referencia:</p>
                <p className="text-right">{numeroReferencia}</p>

                <p className="text-gray-600">Método de pago:</p>
                <p className="text-right">Tarjeta de crédito ****3456</p>
              </div>
            </div>

            <div className="bg-green-50 border border-green-200 p-4 rounded-md text-sm text-green-800">
              <p>Se ha enviado un comprobante de pago a su correo electrónico registrado.</p>
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex flex-col space-y-3">
          <Button className="w-full" variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Descargar Comprobante
          </Button>
          <Link href="/consulta" className="w-full">
            <Button className="w-full">
              <Home className="h-4 w-4 mr-2" />
              Volver a mis facturas
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}
