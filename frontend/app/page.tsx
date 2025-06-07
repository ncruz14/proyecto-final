import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Droplets, CreditCard, History, FileDown, Bell, HelpCircle } from "lucide-react"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Droplets className="h-6 w-6 text-blue-600" />
            <span className="text-xl font-bold">AguaPago</span>
          </div>
          <nav className="hidden md:flex space-x-6">
            <Link href="/" className="text-sm font-medium hover:text-blue-600">
              Inicio
            </Link>
            <Link href="/consulta" className="text-sm font-medium hover:text-blue-600">
              Consultar Factura
            </Link>
            <Link href="/pago" className="text-sm font-medium hover:text-blue-600">
              Pagar
            </Link>
            <Link href="/soporte" className="text-sm font-medium hover:text-blue-600">
              Soporte
            </Link>
          </nav>
          {/* Navigation Links */}
          <div className="flex space-x-3">
            <Link href="/consulta">
              <Button variant="outline">Consultar Factura</Button>
            </Link>
            <Link href="/soporte">
              <Button>Soporte</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-blue-50 to-white py-20 md:py-28">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 mb-4">
              Paga tus facturas de agua sin salir de casa
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Ahorra tiempo y evita filas. Consulta, paga y descarga tus facturas de agua desde cualquier dispositivo,
              en cualquier momento.
            </p>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">Consulta tu factura</h2>
              <form action="/consulta" className="space-y-4">
                <div>
                  <label htmlFor="codigoFactura" className="block text-sm font-medium text-gray-700 mb-1">
                    Ingresa el código de tu factura o número de usuario
                  </label>
                  <div className="flex">
                    <input
                      type="text"
                      id="codigoFactura"
                      name="codigoFactura"
                      placeholder="Ej: F-2025-04-12345 o 1234567"
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                    <Button type="submit" className="rounded-l-none">
                      Consultar
                    </Button>
                  </div>
                </div>
                <div className="text-xs text-gray-500 space-y-1">
                  <p>• <strong>Por código de factura:</strong> Encuentra el código en la parte superior de tu recibo físico (Ej: F-2025-04-12345)</p>
                  <p>• <strong>Por número de usuario:</strong> Usa tu número de cliente de 7 dígitos (Ej: 1234567)</p>
                </div>
              </form>
            </div>
          </div>
          <div className="flex justify-center">
            <img
              src="/image.png"
              alt="Pago de facturas de agua en línea"
              className="rounded-lg shadow-lg max-w-full h-auto"
            />
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16">Nuestros Servicios</h2>
          <div className="grid md:grid-cols-3 gap-10">
            <div className="bg-white p-8 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="bg-blue-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-6">
                <CreditCard className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Pago en Línea</h3>
              <p className="text-gray-600">
                Paga tus facturas de agua de forma segura utilizando diferentes métodos de pago.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="bg-blue-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-6">
                <History className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Historial de Pagos</h3>
              <p className="text-gray-600">
                Consulta tu historial de pagos y mantén un registro de todas tus transacciones.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="bg-blue-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-6">
                <FileDown className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Descarga de Facturas</h3>
              <p className="text-gray-600">Descarga e imprime tus facturas en cualquier momento que lo necesites.</p>
            </div>
            <div className="bg-white p-8 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="bg-blue-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-6">
                <Bell className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Recordatorios</h3>
              <p className="text-gray-600">
                Recibe notificaciones por correo o SMS cuando tus facturas estén próximas a vencer.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="bg-blue-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-6">
                <HelpCircle className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Soporte al Cliente</h3>
              <p className="text-gray-600">
                Resuelve tus dudas a través de nuestro chat en línea o sección de preguntas frecuentes.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="bg-blue-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-6">
                <Droplets className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Información de Consumo</h3>
              <p className="text-gray-600">Visualiza tu consumo de agua y compáralo con periodos anteriores.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16">¿Cómo Funciona?</h2>
          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="bg-blue-600 text-white rounded-full w-14 h-14 flex items-center justify-center mx-auto mb-6">
                1
              </div>
              <h3 className="text-xl font-semibold mb-4">Ingresa tu código</h3>
              <p className="text-gray-600">Introduce el código de tu factura o tu número de usuario para consultar.</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-600 text-white rounded-full w-14 h-14 flex items-center justify-center mx-auto mb-6">
                2
              </div>
              <h3 className="text-xl font-semibold mb-4">Consulta tus facturas</h3>
              <p className="text-gray-600">Visualiza tus facturas pendientes, historial y detalles de cada una.</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-600 text-white rounded-full w-14 h-14 flex items-center justify-center mx-auto mb-6">
                3
              </div>
              <h3 className="text-xl font-semibold mb-4">Realiza el pago</h3>
              <p className="text-gray-600">Paga de forma segura con tarjeta, PSE o efectivo en puntos autorizados.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16">Lo que dicen nuestros usuarios</h2>
          <div className="grid md:grid-cols-3 gap-10">
            <div className="bg-white p-8 rounded-lg border border-gray-200 shadow-sm">
              <p className="text-gray-600 mb-6">
                "Ahora puedo pagar mis facturas desde mi celular sin tener que hacer filas. ¡Es muy fácil de usar!"
              </p>
              <div className="flex items-center">
                <img 
                  src="/people_2.png" 
                  alt="María Gómez" 
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <p className="font-medium">María Gómez</p>
                  <p className="text-sm text-gray-500">El Pital</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-8 rounded-lg border border-gray-200 shadow-sm">
              <p className="text-gray-600 mb-6">
                "Los recordatorios me ayudan a no olvidar el pago y evitar recargos. Excelente servicio."
              </p>
              <div className="flex items-center">
                <img 
                  src="/people_1.png" 
                  alt="Carlos Rodríguez" 
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <p className="font-medium">Carlos Rodríguez</p>
                  <p className="text-sm text-gray-500">Agrado</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-8 rounded-lg border border-gray-200 shadow-sm">
              <p className="text-gray-600 mb-6">
                "Poder descargar mis facturas en cualquier momento me ha facilitado mucho los trámites."
              </p>
              <div className="flex items-center">
                <img 
                  src="/people_3.png" 
                  alt="Ana Martínez" 
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <p className="font-medium">Ana Martínez</p>
                  <p className="text-sm text-gray-500">El Pital</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Comienza a pagar tus facturas en línea hoy mismo</h2>
          <p className="text-xl mb-10 max-w-2xl mx-auto">
            Únete a los miles de usuarios que ya disfrutan de la comodidad de pagar sus facturas de agua desde casa.
          </p>
          <Link href="/consulta">
            <Button size="lg" variant="secondary">
              Consultar mi factura
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Droplets className="h-6 w-6 text-blue-400" />
                <span className="text-xl font-bold">AguaPago</span>
              </div>
              <p className="text-gray-400">La forma más fácil de pagar tus facturas de agua en El Pital y Agrado.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Enlaces rápidos</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/" className="text-gray-400 hover:text-white">
                    Inicio
                  </Link>
                </li>
                <li>
                  <Link href="/consulta" className="text-gray-400 hover:text-white">
                    Consultar Factura
                  </Link>
                </li>
                <li>
                  <Link href="/pago" className="text-gray-400 hover:text-white">
                    Pagar
                  </Link>
                </li>
                <li>
                  <Link href="/soporte" className="text-gray-400 hover:text-white">
                    Soporte
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contacto</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Calle Principal #123</li>
                <li>El Pital, Huila</li>
                <li>soporte@aguapago.com</li>
                <li>(57) 8765-4321</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Horario de atención</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Lunes a Viernes: 8:00 AM - 6:00 PM</li>
                <li>Sábados: 8:00 AM - 1:00 PM</li>
                <li>Domingos y festivos: Cerrado</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>© 2025 AguaPago. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
