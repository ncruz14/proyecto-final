import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Droplets, MapPin, Clock, Phone } from "lucide-react"

// Datos de ejemplo para los puntos de pago
const puntosPago = [
  {
    id: 1,
    nombre: "Oficina Principal - El Pital",
    direccion: "Calle Principal #123, Centro, El Pital",
    horario: "Lunes a Viernes: 8:00 AM - 5:00 PM\nSábados: 8:00 AM - 12:00 PM",
    telefono: "(57) 8765-4321",
    tipo: "oficina",
  },
  {
    id: 2,
    nombre: "Oficina Principal - Agrado",
    direccion: "Carrera 5 #10-15, Centro, Agrado",
    horario: "Lunes a Viernes: 8:00 AM - 5:00 PM\nSábados: 8:00 AM - 12:00 PM",
    telefono: "(57) 8765-4322",
    tipo: "oficina",
  },
  {
    id: 3,
    nombre: "Efecty - El Pital",
    direccion: "Calle 8 #7-42, El Pital",
    horario: "Lunes a Sábado: 8:00 AM - 8:00 PM\nDomingos: 9:00 AM - 1:00 PM",
    telefono: "(57) 8765-1111",
    tipo: "corresponsal",
  },
  {
    id: 4,
    nombre: "Efecty - Agrado",
    direccion: "Carrera 7 #12-30, Agrado",
    horario: "Lunes a Sábado: 8:00 AM - 8:00 PM\nDomingos: 9:00 AM - 1:00 PM",
    telefono: "(57) 8765-2222",
    tipo: "corresponsal",
  },
  {
    id: 5,
    nombre: "Baloto - El Pital",
    direccion: "Calle 10 #5-23, El Pital",
    horario: "Lunes a Domingo: 7:00 AM - 9:00 PM",
    telefono: "(57) 8765-3333",
    tipo: "corresponsal",
  },
  {
    id: 6,
    nombre: "Baloto - Agrado",
    direccion: "Carrera 6 #9-18, Agrado",
    horario: "Lunes a Domingo: 7:00 AM - 9:00 PM",
    telefono: "(57) 8765-4444",
    tipo: "corresponsal",
  },
  {
    id: 7,
    nombre: "Supermercado La Economía - El Pital",
    direccion: "Calle 12 #8-45, El Pital",
    horario: "Lunes a Sábado: 7:00 AM - 8:00 PM\nDomingos: 8:00 AM - 2:00 PM",
    telefono: "(57) 8765-5555",
    tipo: "corresponsal",
  },
  {
    id: 8,
    nombre: "Supermercado El Ahorro - Agrado",
    direccion: "Carrera 8 #11-25, Agrado",
    horario: "Lunes a Sábado: 7:00 AM - 8:00 PM\nDomingos: 8:00 AM - 2:00 PM",
    telefono: "(57) 8765-6666",
    tipo: "corresponsal",
  },
]

export default function PuntosPago() {
  // Separar los puntos de pago por tipo
  const oficinas = puntosPago.filter((punto) => punto.tipo === "oficina")
  const corresponsales = puntosPago.filter((punto) => punto.tipo === "corresponsal")

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b bg-white">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-2">
            <Droplets className="h-6 w-6 text-blue-600" />
            <span className="text-xl font-bold">AguaPago</span>
          </Link>
          <nav className="hidden md:flex space-x-6">
            <Link href="/" className="text-sm font-medium hover:text-blue-600">
              Inicio
            </Link>
            <Link href="/puntos-pago" className="text-sm font-medium hover:text-blue-600 text-blue-600">
              Puntos de Pago
            </Link>
            <Link href="/soporte" className="text-sm font-medium hover:text-blue-600">
              Soporte
            </Link>
          </nav>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <Link href="/" className="flex items-center text-sm text-gray-600 hover:text-blue-600 mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Volver al inicio
        </Link>

        <h1 className="text-3xl font-bold mb-8">Puntos de Pago</h1>

        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Oficinas Principales</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {oficinas.map((punto) => (
              <Card key={punto.id}>
                <CardHeader>
                  <CardTitle>{punto.nombre}</CardTitle>
                  <CardDescription>Oficina oficial de atención al cliente</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex">
                      <MapPin className="h-5 w-5 text-gray-500 mr-2 flex-shrink-0" />
                      <p>{punto.direccion}</p>
                    </div>
                    <div className="flex">
                      <Clock className="h-5 w-5 text-gray-500 mr-2 flex-shrink-0" />
                      <p className="whitespace-pre-line">{punto.horario}</p>
                    </div>
                    <div className="flex">
                      <Phone className="h-5 w-5 text-gray-500 mr-2 flex-shrink-0" />
                      <p>{punto.telefono}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">Corresponsales y Puntos Autorizados</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {corresponsales.map((punto) => (
              <Card key={punto.id}>
                <CardHeader>
                  <CardTitle>{punto.nombre}</CardTitle>
                  <CardDescription>Punto autorizado para pagos</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex">
                      <MapPin className="h-5 w-5 text-gray-500 mr-2 flex-shrink-0" />
                      <p>{punto.direccion}</p>
                    </div>
                    <div className="flex">
                      <Clock className="h-5 w-5 text-gray-500 mr-2 flex-shrink-0" />
                      <p className="whitespace-pre-line">{punto.horario}</p>
                    </div>
                    <div className="flex">
                      <Phone className="h-5 w-5 text-gray-500 mr-2 flex-shrink-0" />
                      <p>{punto.telefono}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="mt-12 bg-blue-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Información Importante</h2>
          <ul className="space-y-2 list-disc pl-5">
            <li>Para pagos en efectivo, debe presentar el código de barras de su factura o el número de referencia.</li>
            <li>Los pagos realizados después de las 4:00 PM pueden reflejarse al siguiente día hábil.</li>
            <li>En los corresponsales puede aplicar una comisión adicional por el servicio de recaudo.</li>
            <li>
              Para pagos de facturas vencidas, se recomienda verificar el valor actualizado en nuestras oficinas o a
              través de la plataforma web.
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
