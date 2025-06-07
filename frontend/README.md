# 💧 AguaPago

**La forma más fácil de pagar tus facturas de agua en El Pital y Agrado**

AguaPago es una plataforma web moderna y fácil de usar que permite a los usuarios consultar, pagar y gestionar sus facturas de agua de manera completamente digital, evitando filas y ahorrando tiempo.

![Next.js](https://img.shields.io/badge/Next.js-15.2.4-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.17-38B2AC?style=flat-square&logo=tailwind-css)
![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react)

## 🚀 Características Principales

### ✨ Servicios Disponibles
- **🔍 Consulta de Facturas**: Ingresa el código de tu factura para ver todos los detalles
- **💳 Pago en Línea**: Paga de forma segura con múltiples métodos de pago
- **📊 Historial de Pagos**: Consulta y mantén un registro de todas tus transacciones
- **📄 Descarga de Facturas**: Descarga e imprime tus facturas cuando las necesites
- **🔔 Recordatorios**: Recibe notificaciones antes de que venzan tus facturas
- **💬 Soporte al Cliente**: Chat en línea y sección de preguntas frecuentes
- **📈 Información de Consumo**: Visualiza y compara tu consumo de agua

### 🎯 Funcionalidades Clave
- **Consulta Rápida**: Busca facturas usando el código que aparece en tu recibo físico
- **Interfaz Intuitiva**: Diseño moderno y fácil de navegar
- **Responsive Design**: Funciona perfectamente en dispositivos móviles y desktop
- **Modo Oscuro/Claro**: Cambia entre temas según tu preferencia
- **Accesibilidad**: Diseñado siguiendo las mejores prácticas de accesibilidad web

## 🛠️ Tecnologías Utilizadas

### Frontend
- **[Next.js 15.2.4](https://nextjs.org/)** - Framework de React con App Router
- **[React 19](https://react.dev/)** - Biblioteca de interfaz de usuario
- **[TypeScript 5](https://www.typescriptlang.org/)** - Tipado estático para JavaScript

### Styling & UI
- **[Tailwind CSS 3.4.17](https://tailwindcss.com/)** - Framework de CSS utilitario
- **[Radix UI](https://www.radix-ui.com/)** - Componentes accesibles y personalizables
- **[Lucide React](https://lucide.dev/)** - Iconos SVG elegantes
- **[Next Themes](https://github.com/pacocoursey/next-themes)** - Soporte para temas

### Formularios & Validación
- **[React Hook Form](https://react-hook-form.com/)** - Gestión eficiente de formularios
- **[Zod](https://zod.dev/)** - Validación de esquemas con TypeScript

### Visualización de Datos
- **[Recharts](https://recharts.org/)** - Gráficos y visualizaciones de datos

### Herramientas de Desarrollo
- **[PostCSS](https://postcss.org/)** - Procesamiento de CSS
- **[ESLint](https://eslint.org/)** - Linting de código

## 📋 Requisitos Previos

- **Node.js 18+** 
- **npm** o **pnpm** (recomendado)

## 🚀 Instalación

1. **Clona el repositorio**
   ```bash
   git clone <repository-url>
   cd agua-pago
   cd frontend
   ```

2. **Instala las dependencias**
   ```bash
   # Con npm
   npm install --legacy-peer-deps
   
   # Con pnpm (recomendado)
   pnpm install
   ```

3. **Inicia el servidor de desarrollo**
   ```bash
   npm run dev
   # o
   pnpm dev
   ```

4. **Abre tu navegador**
   
   Visita [http://localhost:3000](http://localhost:3000) para ver la aplicación.

## 📝 Scripts Disponibles

```bash
# Desarrollo
npm run dev          # Inicia el servidor de desarrollo

# Producción
npm run build        # Construye la aplicación para producción
npm run start        # Inicia el servidor de producción

# Calidad de código
npm run lint         # Ejecuta ESLint para revisar el código
```

## 🌐 Rutas Principales

- **`/`** - Página de inicio con información general y consulta de facturas
- **`/consulta`** - Página de consulta detallada de facturas
- **`/facturas`** - Gestión de facturas del usuario
- **`/historial`** - Historial de pagos realizados
- **`/puntos-pago`** - Información sobre puntos de pago físicos
- **`/soporte`** - Centro de ayuda y soporte al cliente

## 🎨 Estructura del Proyecto

```
agua-pago/
├── app/                  # App Router de Next.js
│   ├── page.tsx          # Página principal
│   ├── layout.tsx        # Layout global
│   └── ...
├── components/           # Componentes reutilizables
│   └── ui/               # Componentes de UI base (Radix)
├── lib/                  # Utilidades y configuraciones
├── hooks/                # Custom React hooks
├── styles/               # Estilos globales
├── public/               # Archivos estáticos
├── package.json          # Dependencias y scripts
├── tailwind.config.ts    # Configuración de Tailwind
├── tsconfig.json         # Configuración de TypeScript
└── next.config.mjs       # Configuración de Next.js
```

## 🔧 Configuración

### Variables de Entorno

Crea un archivo `.env.local` en la raíz del proyecto:

```env
# Configuración de la aplicación
NEXT_PUBLIC_APP_URL=http://localhost:3000

# APIs y servicios externos
# Agregar aquí las variables necesarias para APIs de pago, etc.
```

### Personalización de Tema

El proyecto usa Tailwind CSS con una configuración personalizada. Puedes modificar los colores y estilos en `tailwind.config.ts`.

## 🚀 Despliegue

### Vercel (Recomendado)
```bash
# Instala Vercel CLI
npm i -g vercel

# Despliega
vercel
```

### Otros Proveedores
La aplicación es compatible con cualquier proveedor que soporte Next.js:
- **Netlify**
- **AWS Amplify** 
- **Railway**
- **Digital Ocean App Platform**

## 🤝 Contribución

1. Haz fork del proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 📞 Contacto

- **Email**: soporte@aguapago.com
- **Teléfono**: (57) 8765-4321
- **Dirección**: Calle Principal #123, El Pital, Huila

## 🏛️ Servicios

AguaPago presta servicios en:
- **El Pital, Huila**
- **Agrado, Huila**

---

### 🕒 Horario de Atención
- **Lunes a Viernes**: 8:00 AM - 6:00 PM
- **Sábados**: 8:00 AM - 1:00 PM  
- **Domingos y festivos**: Cerrado

---

**© 2025 AguaPago. Todos los derechos reservados.** 