"use client"

import { Suspense, useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AlertCircle, CheckCircle, Clock, CreditCard, ArrowLeft, Droplets, Shield, Lock } from 'lucide-react'
import { Separator } from "@/components/ui/separator"

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

function PagoContent() {
  const searchParams = useSearchParams()
  const facturaId = searchParams.get('facturaId')
  
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [bill, setBill] = useState<Bill | null>(null)
  const [customer, setCustomer] = useState<Customer | null>(null)
  const [paymentMethod, setPaymentMethod] = useState('')
  const [processing, setProcessing] = useState(false)
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    if (facturaId) {
      fetchBillData(facturaId)
    }
  }, [facturaId])

  const fetchBillData = async (billNumber: string) => {
    setLoading(true)
    setError(null)

    try {
      const response = await fetch(`https://aguas-pago-backend.piddet.com/api/bills?billNumber=${billNumber}`)
      
      if (response.ok) {
        const data = await response.json()
        setBill(data.data)
        
        // Obtener info del cliente
        const customerResponse = await fetch(`https://aguas-pago-backend.piddet.com/api/customers?clientId=${data.data.clientId}`)
        if (customerResponse.ok) {
          const customerData = await customerResponse.json()
          setCustomer(customerData.data)
        }
      } else {
        setError('No se encontró la factura especificada.')
      }
    } catch (err) {
      setError('Error al conectar con el servidor.')
    } finally {
      setLoading(false)
    }
  }

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!paymentMethod || !bill) return

    setProcessing(true)
    
    // Simular proceso de pago
    setTimeout(() => {
      setProcessing(false)
      setSuccess(true)
    }, 3000)
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

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando información de pago...</p>
        </div>
      </div>
    )
  }

  if (!bill) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
        <header className="border-b bg-white shadow-sm">
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <Link href="/" className="flex items-center space-x-2">
              <Droplets className="h-6 w-6 text-blue-600" />
              <span className="text-xl font-bold">AguaPago</span>
            </Link>
          </div>
        </header>

        <div className="container mx-auto px-4 py-8">
          <Link href="/consulta" className="flex items-center text-sm text-gray-600 hover:text-blue-600 mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver a consulta
          </Link>

          <Card className="max-w-2xl mx-auto">
            <CardContent className="pt-6">
              <div className="text-center">
                <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
                <h2 className="text-xl font-semibold text-gray-900 mb-2">Factura no encontrada</h2>
                <p className="text-gray-600">No se pudo cargar la información de la factura para procesar el pago.</p>
                {error && <p className="text-red-600 mt-2">{error}</p>}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-white">
        <header className="border-b bg-white shadow-sm">
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <Link href="/" className="flex items-center space-x-2">
              <Droplets className="h-6 w-6 text-blue-600" />
              <span className="text-xl font-bold">AguaPago</span>
            </Link>
          </div>
        </header>

        <div className="container mx-auto px-4 py-8">
          <Card className="max-w-2xl mx-auto">
            <CardContent className="pt-6">
              <div className="text-center">
                <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-4" />
                <h2 className="text-2xl font-semibold text-gray-900 mb-2">¡Pago Exitoso!</h2>
                <p className="text-gray-600 mb-6">Tu factura ha sido pagada correctamente.</p>
                
                <div className="bg-gray-50 p-4 rounded-lg mb-6">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="font-medium text-gray-700">Factura</p>
                      <p className="text-gray-900">{bill.billNumber}</p>
                    </div>
                    <div>
                      <p className="font-medium text-gray-700">Monto</p>
                      <p className="text-gray-900 font-semibold">{formatCurrency(bill.amount)}</p>
                    </div>
                    <div>
                      <p className="font-medium text-gray-700">Método</p>
                      <p className="text-gray-900">{paymentMethod}</p>
                    </div>
                    <div>
                      <p className="font-medium text-gray-700">Fecha</p>
                      <p className="text-gray-900">{new Date().toLocaleDateString('es-CO')}</p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button variant="outline">
                    Descargar Comprobante
                  </Button>
                  <Link href="/consulta">
                    <Button>
                      Volver a Consultas
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <header className="border-b bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-2">
            <Droplets className="h-6 w-6 text-blue-600" />
            <span className="text-xl font-bold">AguaPago</span>
          </Link>
          <nav className="hidden md:flex space-x-6">
            <Link href="/" className="text-sm font-medium hover:text-blue-600">Inicio</Link>
            <Link href="/consulta" className="text-sm font-medium hover:text-blue-600">Consultar</Link>
            <Link href="/soporte" className="text-sm font-medium hover:text-blue-600">Soporte</Link>
          </nav>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <Link href="/consulta" className="flex items-center text-sm text-gray-600 hover:text-blue-600 mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Volver a consulta
        </Link>

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Pagar Factura</h1>
          <p className="text-gray-600">Procesa el pago de tu factura de manera segura</p>
        </div>

        <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Resumen de la factura */}
          <Card>
            <CardHeader>
              <CardTitle className="text-gray-900">Resumen de la Factura</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-700">Factura</p>
                  <p className="text-gray-900 font-semibold">{bill.billNumber}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">Período</p>
                  <p className="text-gray-900">{bill.period}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">Vencimiento</p>
                  <p className={`${bill.status === 'OVERDUE' ? 'text-red-600 font-semibold' : 'text-gray-900'}`}>
                    {formatDate(bill.dueDate)}
                  </p>
                </div>
                {bill.consumption && (
                  <div>
                    <p className="text-sm font-medium text-gray-700">Consumo</p>
                    <p className="text-gray-900">{bill.consumption}</p>
                  </div>
                )}
              </div>

              <Separator />

              {customer && (
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Cliente</h3>
                  <div className="space-y-1">
                    <p className="text-gray-900">{customer.name}</p>
                    <p className="text-gray-600 text-sm">{customer.address}</p>
                    <p className="text-gray-600 text-sm">Cliente: {customer.clientId}</p>
                  </div>
                </div>
              )}

              <Separator />

              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-gray-900">Total a Pagar</span>
                  <span className="text-2xl font-bold text-gray-900">{formatCurrency(bill.amount)}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Formulario de pago */}
          <Card>
            <CardHeader>
              <CardTitle className="text-gray-900 flex items-center">
                <Shield className="w-5 h-5 mr-2" />
                Información de Pago
              </CardTitle>
              <CardDescription>
                Completa los datos para procesar tu pago de forma segura
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handlePayment} className="space-y-6">
                <div>
                  <Label htmlFor="payment-method">Método de Pago</Label>
                  <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona método de pago" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="tarjeta-credito">Tarjeta de Crédito</SelectItem>
                      <SelectItem value="tarjeta-debito">Tarjeta de Débito</SelectItem>
                      <SelectItem value="pse">PSE</SelectItem>
                      <SelectItem value="nequi">Nequi</SelectItem>
                      <SelectItem value="daviplata">Daviplata</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {paymentMethod && paymentMethod.includes('tarjeta') && (
                  <>
                    <div>
                      <Label htmlFor="card-number">Número de Tarjeta</Label>
                      <Input
                        id="card-number"
                        placeholder="1234 5678 9012 3456"
                        type="text"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="expiry">Fecha de Vencimiento</Label>
                        <Input
                          id="expiry"
                          placeholder="MM/AA"
                          type="text"
                        />
                      </div>
                      <div>
                        <Label htmlFor="cvv">CVV</Label>
                        <Input
                          id="cvv"
                          placeholder="123"
                          type="text"
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="cardholder">Nombre del Titular</Label>
                      <Input
                        id="cardholder"
                        placeholder="Como aparece en la tarjeta"
                        type="text"
                      />
                    </div>
                  </>
                )}

                {paymentMethod === 'pse' && (
                  <div>
                    <Label htmlFor="bank">Selecciona tu Banco</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona banco" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="bancolombia">Bancolombia</SelectItem>
                        <SelectItem value="banco-bogota">Banco de Bogotá</SelectItem>
                        <SelectItem value="davivienda">Davivienda</SelectItem>
                        <SelectItem value="bbva">BBVA</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}

                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Lock className="w-4 h-4" />
                  <span>Tus datos están protegidos con encriptación de 256 bits</span>
                </div>

                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={!paymentMethod || processing}
                >
                  {processing ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Procesando Pago...
                    </>
                  ) : (
                    <>
                      <CreditCard className="w-4 h-4 mr-2" />
                      Pagar {formatCurrency(bill.amount)}
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default function PagoPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando pago...</p>
        </div>
      </div>
    }>
      <PagoContent />
    </Suspense>
  )
}
