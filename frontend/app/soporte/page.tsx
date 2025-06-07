"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { ArrowLeft, MessageSquare, Phone, Mail } from "lucide-react"

export default function Soporte() {
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    asunto: "",
    mensaje: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulación de envío
    setTimeout(() => {
      setIsLoading(false)
      alert("Mensaje enviado correctamente. Nos pondremos en contacto pronto.")
      setFormData({
        nombre: "",
        email: "",
        asunto: "",
        mensaje: "",
      })
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <Link href="/" className="flex items-center text-sm text-gray-600 hover:text-blue-600 mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Volver al inicio
        </Link>

        <h1 className="text-3xl font-bold mb-8">Centro de Soporte</h1>

        <Tabs defaultValue="faq">
          <TabsList className="grid grid-cols-3 mb-8">
            <TabsTrigger value="faq">Preguntas Frecuentes</TabsTrigger>
            <TabsTrigger value="contacto">Contacto</TabsTrigger>
            <TabsTrigger value="chat">Chat en Vivo</TabsTrigger>
          </TabsList>

          <TabsContent value="faq">
            <Card>
              <CardHeader>
                <CardTitle>Preguntas Frecuentes</CardTitle>
                <CardDescription>
                  Encuentre respuestas a las preguntas más comunes sobre nuestro servicio
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>¿Cómo puedo registrarme en la plataforma?</AccordionTrigger>
                    <AccordionContent>
                      Para registrarse en nuestra plataforma, haga clic en el botón "Registrarse" en la página de
                      inicio. Deberá proporcionar su número de cliente (que puede encontrar en su factura física),
                      nombre completo, correo electrónico y crear una contraseña. Una vez completado el formulario,
                      recibirá un correo de confirmación para activar su cuenta.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-2">
                    <AccordionTrigger>¿Qué métodos de pago aceptan?</AccordionTrigger>
                    <AccordionContent>
                      Aceptamos diversos métodos de pago para su comodidad:
                      <ul className="list-disc pl-5 mt-2">
                        <li>Tarjetas de crédito y débito (Visa, Mastercard, American Express)</li>
                        <li>PSE (Pago Seguro Electrónico) para transferencias bancarias</li>
                        <li>Efectivo a través de puntos de pago como Efecty, Baloto y SuRed</li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-3">
                    <AccordionTrigger>¿Cómo puedo obtener mi factura si no la he recibido?</AccordionTrigger>
                    <AccordionContent>
                      Puede descargar su factura directamente desde nuestra plataforma en la sección "Mis Facturas". Si
                      no encuentra su factura o tiene problemas para acceder a ella, puede solicitarla a través del
                      formulario de contacto o llamando a nuestro servicio de atención al cliente. También puede
                      configurar notificaciones para recibir su factura por correo electrónico cada mes.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-4">
                    <AccordionTrigger>¿Qué hago si tengo problemas para realizar un pago?</AccordionTrigger>
                    <AccordionContent>
                      Si experimenta problemas al realizar un pago, verifique que los datos de su tarjeta o cuenta
                      bancaria sean correctos. Asegúrese de tener fondos suficientes y que su tarjeta esté habilitada
                      para compras en línea. Si el problema persiste, puede contactarnos a través del chat en vivo,
                      formulario de contacto o llamando a nuestro servicio de atención al cliente. Le recomendamos tomar
                      una captura de pantalla del error para ayudarnos a resolver el problema más rápidamente.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-5">
                    <AccordionTrigger>¿Cómo puedo reportar un problema con mi servicio de agua?</AccordionTrigger>
                    <AccordionContent>
                      Para reportar problemas con su servicio de agua (como fugas, baja presión o cortes no
                      programados), puede utilizar la sección de "Reportes" en nuestra plataforma. También puede
                      contactarnos directamente a través del formulario de contacto, chat en vivo o llamando a nuestra
                      línea de atención. Para emergencias, recomendamos llamar a nuestra línea de atención 24/7 al (57)
                      8765-4321.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-6">
                    <AccordionTrigger>¿Puedo programar pagos automáticos?</AccordionTrigger>
                    <AccordionContent>
                      Sí, ofrecemos la opción de programar pagos automáticos. Para activar esta función, vaya a la
                      sección "Mi Perfil" y seleccione "Configurar Pagos Automáticos". Deberá registrar un método de
                      pago (tarjeta o cuenta bancaria) y autorizar los débitos automáticos. Recibirá una notificación
                      antes de cada cargo y podrá desactivar esta opción en cualquier momento.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="contacto">
            <Card>
              <CardHeader>
                <CardTitle>Contáctenos</CardTitle>
                <CardDescription>
                  Complete el formulario y nos pondremos en contacto con usted lo antes posible
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit}>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label htmlFor="nombre" className="text-sm font-medium">
                          Nombre completo
                        </label>
                        <Input id="nombre" name="nombre" required value={formData.nombre} onChange={handleChange} />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium">
                          Correo electrónico
                        </label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="asunto" className="text-sm font-medium">
                        Asunto
                      </label>
                      <Input id="asunto" name="asunto" required value={formData.asunto} onChange={handleChange} />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="mensaje" className="text-sm font-medium">
                        Mensaje
                      </label>
                      <Textarea
                        id="mensaje"
                        name="mensaje"
                        rows={5}
                        required
                        value={formData.mensaje}
                        onChange={handleChange}
                      />
                    </div>

                    <Button type="submit" className="w-full" disabled={isLoading}>
                      {isLoading ? "Enviando..." : "Enviar Mensaje"}
                    </Button>
                  </div>
                </form>
              </CardContent>
              <CardFooter className="flex flex-col space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
                  <div className="flex flex-col items-center p-4 border rounded-md">
                    <Phone className="h-8 w-8 text-blue-600 mb-2" />
                    <h3 className="font-medium">Teléfono</h3>
                    <p className="text-gray-600 text-center">(57) 8765-4321</p>
                  </div>
                  <div className="flex flex-col items-center p-4 border rounded-md">
                    <Mail className="h-8 w-8 text-blue-600 mb-2" />
                    <h3 className="font-medium">Correo</h3>
                    <p className="text-gray-600 text-center">soporte@aguapago.com</p>
                  </div>
                  <div className="flex flex-col items-center p-4 border rounded-md">
                    <MessageSquare className="h-8 w-8 text-blue-600 mb-2" />
                    <h3 className="font-medium">Chat</h3>
                    <p className="text-gray-600 text-center">Lun-Vie: 8am-6pm</p>
                  </div>
                </div>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="chat">
            <Card>
              <CardHeader>
                <CardTitle>Chat en Vivo</CardTitle>
                <CardDescription>Converse con uno de nuestros agentes de soporte en tiempo real</CardDescription>
              </CardHeader>
              <CardContent className="h-96 flex flex-col">
                <div className="flex-1 border rounded-md p-4 mb-4 overflow-y-auto">
                  <div className="text-center text-gray-500 my-8">
                    <p>Nuestros agentes están listos para ayudarle.</p>
                    <p>Haga clic en "Iniciar Chat" para comenzar una conversación.</p>
                  </div>
                </div>
                <Button className="w-full">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Iniciar Chat
                </Button>
              </CardContent>
              <CardFooter className="text-sm text-gray-500">
                <p>Horario de atención: Lunes a Viernes de 8:00 AM a 6:00 PM</p>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
