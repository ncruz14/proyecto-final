'use client'

import { Suspense, useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { AlertCircle, CheckCircle, Clock, CreditCard, MapPin, Phone, Receipt, DropletIcon, FileText, User, Home, Mail, ArrowLeft, Droplets } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

type Bill = {
  id: string
  billNumber: string
  clientId: string
  period: string
  amount: number
  status: 'PAID' | 'PENDING' | 'OVERDUE'
  dueDate: string
  paymentDate?: string
  receiptNumber?: string
  consumption?: string
  issueDate?: string
}

type Customer = {
  id: string
  clientId: string
  name: string
  address: string
  phone: string
  email?: string
}

function ConsultaContent() {
  const searchParams = useSearchParams()
  const codigoFactura = searchParams.get('codigoFactura')
  
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [bill, setBill] = useState<Bill | null>(null)
  const [bills, setBills] = useState<Bill[]>([])
  const [customer, setCustomer] = useState<Customer | null>(null)
  const [searchType, setSearchType] = useState<'bill' | 'client' | null>(null)
  const [codigoInput, setCodigoInput] = useState(codigoFactura || '')

  useEffect(() => {
    if (codigoFactura) {
      performSearch(codigoFactura)
    }
  }, [codigoFactura])

  const performSearch = async (query: string) => {
    setLoading(true)
    setError(null)
    setBill(null)
    setBills([])
    setCustomer(null)
    setSearchType(null)

    try {
      const isClientId = query.length === 7 && /^\d+$/.test(query)
      
      if (isClientId) {
        setSearchType('client')
        const [customerResponse, billsResponse] = await Promise.all([
          fetch(`https://aguas-pago-backend.piddet.com/api/customers?clientId=${query}`),
          fetch(`https://aguas-pago-backend.piddet.com/api/billsByClient?clientId=${query}`)
        ])

        if (customerResponse.ok && billsResponse.ok) {
          const customerData = await customerResponse.json()
          const billsData = await billsResponse.json()
          
          setCustomer(customerData.data)
          setBills(billsData.data)
        } else {
          setError('No se encontraron datos para este cliente. Por favor, verifica el número ingresado.')
        }
      } else {
        setSearchType('bill')
        const response = await fetch(`https://aguas-pago-backend.piddet.com/api/bills?billNumber=${query}`)
        
        if (response.ok) {
          const data = await response.json()
          setBill(data.data)
          
          const customerResponse = await fetch(`https://aguas-pago-backend.piddet.com/api/customers?clientId=${data.data.clientId}`)
          if (customerResponse.ok) {
            const customerData = await customerResponse.json()
            setCustomer(customerData.data)
          }
        } else {
          setError('No se encontró la factura especificada. Por favor, verifica el número ingresado.')
        }
      }
    } catch (err) {
      setError('Error al conectar con el servidor. Por favor, intenta nuevamente.')
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (codigoInput.trim()) {
      const url = new URL(window.location.href)
      url.searchParams.set('codigoFactura', codigoInput.trim())
      window.history.pushState({}, '', url.toString())
      performSearch(codigoInput.trim())
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(amount)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-CO', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      PAID: { label: 'Pagada', variant: 'default' as const, icon: CheckCircle, color: 'text-green-600' },
      PENDING: { label: 'Pendiente', variant: 'secondary' as const, icon: Clock, color: 'text-yellow-600' },
      OVERDUE: { label: 'Vencida', variant: 'destructive' as const, icon: AlertCircle, color: 'text-red-600' }
    }
    
    const config = statusConfig[status as keyof typeof statusConfig]
    const Icon = config.icon
    
    return (
      <Badge variant={config.variant} className="flex items-center gap-1">
        <Icon className="w-3 h-3" />
        {config.label}
      </Badge>
    )
  }

  const BillDetailCard = ({ billData }: { billData: Bill }) => (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader className="pb-6">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg text-gray-900">Detalle de Factura</CardTitle>
            <CardDescription className="text-sm text-gray-600 mt-1">
              {billData.billNumber}
            </CardDescription>
          </div>
          {getStatusBadge(billData.status)}
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Información principal de la factura */}
        <div className="border-b pb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div>
              <p className="text-xs font-medium text-gray-700">Período</p>
              <p className="text-sm font-semibold text-gray-900">{billData.period}</p>
            </div>
            <div>
              <p className="text-xs font-medium text-gray-700">Valor Total</p>
              <p className="text-lg font-bold text-gray-900">{formatCurrency(billData.amount)}</p>
            </div>
            <div>
              <p className="text-xs font-medium text-gray-700">Vencimiento</p>
              <p className={`text-sm font-semibold ${billData.status === 'OVERDUE' ? 'text-red-600' : 'text-gray-900'}`}>
                {formatDate(billData.dueDate)}
              </p>
            </div>
            {billData.issueDate && (
              <div>
                <p className="text-xs font-medium text-gray-700">Fecha de Emisión</p>
                <p className="text-sm text-gray-900">{formatDate(billData.issueDate)}</p>
              </div>
            )}
            {billData.consumption && (
              <div>
                <p className="text-xs font-medium text-gray-700">Consumo</p>
                <p className="text-sm text-gray-900 font-semibold">{billData.consumption}</p>
              </div>
            )}
          </div>
        </div>

        {/* Estado de la factura */}
        <div className="border-b pb-6">
          {billData.status === 'PAID' && billData.paymentDate ? (
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-3">Estado: Pagada</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-xs font-medium text-gray-700">Fecha de Pago</p>
                  <p className="text-sm text-gray-900 font-semibold">{formatDate(billData.paymentDate)}</p>
                </div>
                {billData.receiptNumber && (
                  <div>
                    <p className="text-xs font-medium text-gray-700">Comprobante</p>
                    <p className="text-sm text-gray-900 font-semibold">{billData.receiptNumber}</p>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div>
              <h3 className={`text-sm font-semibold mb-3 ${billData.status === 'OVERDUE' ? 'text-red-600' : 'text-gray-900'}`}>
                Estado: {billData.status === 'OVERDUE' ? 'Vencida' : 'Pendiente'}
              </h3>
              {billData.status === 'OVERDUE' && (
                <p className="text-sm text-red-600 font-medium mb-4">
                  Esta factura venció el {formatDate(billData.dueDate)}
                </p>
              )}
              <div className="flex flex-col sm:flex-row gap-3">
                <Link href={`/pago?facturaId=${billData.billNumber}`}>
                  <Button variant="default">
                    <CreditCard className="w-4 h-4 mr-2" />
                    Pagar Ahora
                  </Button>
                </Link>
                <Button variant="outline">
                  <Receipt className="w-4 h-4 mr-2" />
                  Descargar Factura
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Información del cliente */}
        {customer && (
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Cliente</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <p className="text-xs font-medium text-gray-700">Nombre</p>
                <p className="text-sm text-gray-900 font-semibold">{customer.name}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-gray-700">Código</p>
                <p className="text-sm text-gray-900 font-semibold">{customer.clientId}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-gray-700">Teléfono</p>
                <p className="text-sm text-gray-900">{customer.phone}</p>
              </div>
              <div className="md:col-span-2">
                <p className="text-xs font-medium text-gray-700">Dirección</p>
                <p className="text-sm text-gray-900">{customer.address}</p>
              </div>
              {customer.email && (
                <div>
                  <p className="text-xs font-medium text-gray-700">Email</p>
                  <p className="text-sm text-gray-900">{customer.email}</p>
                </div>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-gray-300 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Consultando información...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <header className="border-b bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-2">
            <Droplets className="h-6 w-6 text-gray-800" />
            <span className="text-xl font-bold">AguaPago</span>
          </Link>
          <nav className="hidden md:flex space-x-6">
            <Link href="/" className="text-sm font-medium hover:text-gray-800">Inicio</Link>
            <Link href="/puntos-pago" className="text-sm font-medium hover:text-gray-800">Puntos de Pago</Link>
            <Link href="/soporte" className="text-sm font-medium hover:text-gray-800">Soporte</Link>
          </nav>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <Link href="/" className="flex items-center text-sm text-gray-600 hover:text-gray-800 mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Volver al inicio
        </Link>

        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Consulta de Facturas</h1>
          <p className="text-sm text-gray-600">Sistema de consulta AguaPago</p>
        </div>

        <Card className="max-w-2xl mx-auto mb-8">
          <CardHeader>
            <CardTitle className="text-lg">Buscar Factura</CardTitle>
            <CardDescription className="text-sm">
              Ingresa el número de factura (ej: F-2025-02-12345) o tu código de cliente (ej: 1234567)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4">
              <Input
                type="text"
                placeholder="Ej: F-2025-02-12345 o 1234567"
                value={codigoInput}
                onChange={(e) => setCodigoInput(e.target.value)}
                className="flex-1"
                disabled={loading}
              />
              <Button type="submit" disabled={loading}>
                {loading ? 'Consultando...' : 'Consultar'}
              </Button>
            </form>
          </CardContent>
        </Card>

        {error && (
          <div className="max-w-2xl mx-auto mb-8">
            <Card className="border-red-200 bg-red-50">
              <CardContent className="pt-6">
                <div className="flex items-center space-x-2 text-red-700">
                  <AlertCircle className="w-5 h-5" />
                  <span className="font-medium">Error</span>
                </div>
                <p className="text-red-600 mt-2">{error}</p>
              </CardContent>
            </Card>
          </div>
        )}

        {searchType === 'bill' && bill && (
          <div className="mb-8">
            <BillDetailCard billData={bill} />
          </div>
        )}

        {searchType === 'client' && customer && bills.length > 0 && (
          <div className="space-y-6">
            <Card className="max-w-4xl mx-auto">
              <CardHeader>
                <CardTitle className="text-gray-800 text-lg flex items-center">
                  <User className="w-5 h-5 mr-2" />
                  Cliente: {customer.name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-xs font-medium text-gray-700">Código</p>
                    <p className="text-sm font-semibold text-gray-900">{customer.clientId}</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-700">Teléfono</p>
                    <p className="text-sm text-gray-900">{customer.phone}</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-700">Dirección</p>
                    <p className="text-sm text-gray-900">{customer.address}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="max-w-4xl mx-auto">
              <CardHeader>
                <CardTitle className="text-gray-800 text-lg">Facturas ({bills.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {bills.map((bill) => (
                    <div key={bill.id} className="border rounded-lg p-4 bg-white hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="text-sm font-semibold text-gray-900">{bill.billNumber}</h3>
                          <p className="text-xs text-gray-600">{bill.period}</p>
                        </div>
                        {getStatusBadge(bill.status)}
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs mb-3">
                        <div>
                          <p className="text-gray-600">Valor</p>
                          <p className="text-sm font-semibold">{formatCurrency(bill.amount)}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Vencimiento</p>
                          <p className="text-sm">{formatDate(bill.dueDate)}</p>
                        </div>
                        {bill.consumption && (
                          <div>
                            <p className="text-gray-600">Consumo</p>
                            <p className="text-sm">{bill.consumption}</p>
                          </div>
                        )}
                        {bill.paymentDate && (
                          <div>
                            <p className="text-gray-600">Fecha de Pago</p>
                            <p className="text-sm">{formatDate(bill.paymentDate)}</p>
                          </div>
                        )}
                      </div>
                      
                      <div className="pt-3 border-t flex gap-2">
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => {
                            setCodigoInput(bill.billNumber)
                            performSearch(bill.billNumber)
                          }}
                        >
                          Ver Detalle Completo
                        </Button>
                        {bill.status !== 'PAID' && (
                          <Link href={`/pago?facturaId=${bill.billNumber}`}>
                            <Button size="sm">
                              <CreditCard className="w-4 h-4 mr-1" />
                              Pagar
                            </Button>
                          </Link>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {!loading && !error && !bill && bills.length === 0 && codigoFactura && (
          <div className="text-center max-w-2xl mx-auto">
            <Card>
              <CardContent className="pt-6">
                <p className="text-gray-600">No se encontraron resultados para la búsqueda.</p>
                <p className="text-sm text-gray-500 mt-2">
                  Código buscado: <strong>{codigoFactura}</strong>
                </p>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}

export default function ConsultaPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando consulta...</p>
        </div>
      </div>
    }>
      <ConsultaContent />
    </Suspense>
  )
} 