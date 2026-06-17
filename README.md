# 📸 Galería de Fotos - Formulario

Una aplicación web moderna para subir y gestionar una galería de fotos. Construida con **Next.js**, **React**, **MongoDB** y **Cloudinary**.

## ✨ Características

- ✅ Formulario para subir imágenes con título y descripción
- ☁️ Almacenamiento de imágenes en **Cloudinary**
- 🗄️ Base de datos **MongoDB** para gestionar metadatos
- 🎨 Interfaz moderna con **Tailwind CSS** y **HeroUI**
- 📱 Diseño responsivo (mobile-first)
- 🔔 Notificaciones con **React Toastify**
- ⚡ Rendimiento optimizado con Next.js 16

## 🚀 Requisitos Previos

Antes de instalar, asegúrate de tener instalado:

- **Node.js** (v18 o superior) - [Descargar](https://nodejs.org/)
- **npm** o **yarn**
- Cuenta en **MongoDB** (MongoDB Atlas) - [Crear cuenta](https://www.mongodb.com/cloud/atlas)
- Cuenta en **Cloudinary** - [Crear cuenta](https://cloudinary.com/)

## 📦 Instalación

### 1. Clonar el repositorio

```bash
git clone https://github.com/estiwar3883/Galeria-de-fotos-.git
cd Galeria-de-fotos-
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar variables de entorno

Crea un archivo `.env.local` en la raíz del proyecto y añade tus credenciales:

```bash
# MongoDB
MONGODB_URI=mongodb+srv://usuario:contraseña@cluster0.mongodb.net/galeria

# Cloudinary
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=tu_cloud_name
CLOUDINARY_API_KEY=tu_api_key
CLOUDINARY_API_SECRET=tu_api_secret
```

#### Cómo obtener tus credenciales:

**MongoDB:**
1. Ve a [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Crea un cluster
3. En "Database Access" crea un usuario
4. En "Network Access" añade tu IP o 0.0.0.0/0
5. Copia la connection string

**Cloudinary:**
1. Ve a [Cloudinary Dashboard](https://cloudinary.com/console)
2. En el Dashboard encontrarás tu `Cloud Name`, `API Key` y `API Secret`

### 4. Ejecutar en desarrollo

```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:3000`

## 📖 Uso

### Páginas principales

- **`/`** - Página de inicio
- **`/Form`** - Formulario para subir imágenes
- **`/img`** - Galería de fotos subidas

### Subir una imagen

1. Ve a `/Form`
2. Completa el formulario:
   - Título de la imagen
   - Descripción
   - Selecciona una imagen
3. Haz clic en "Subir"
4. Recibirás una notificación de éxito

### Ver galería

1. Ve a `/img`
2. Visualiza todas las imágenes subidas

## 🏗️ Estructura del Proyecto

```
.
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── Form/
│   │   │       └── route.ts          # API para procesar formulario
│   │   ├── Form/
│   │   │   └── page.tsx              # Página del formulario
│   │   ├── img/
│   │   │   └── page.tsx              # Página de galería
│   │   ├── helpers/
│   │   │   └── uploadImg.ts          # Funciones de carga a Cloudinary
│   │   ├── globals.css               # Estilos globales
│   │   └── layout.tsx                # Layout principal
│   ├── database/
│   │   └── models/
│   │       └── files.ts              # Modelo MongoDB para imágenes
│   ├── lib/
│   │   ├── cloudinary.ts             # Configuración de Cloudinary
│   │   └── database.ts               # Conexión a MongoDB
│   └── service/
│       └── ApiForm.ts                # Servicio para llamadas API
├── package.json
├── tsconfig.json
├── tailwind.config.js
├── next.config.ts
└── eslint.config.mjs
```

## 🛠️ Scripts Disponibles

```bash
# Desarrollo
npm run dev          # Inicia el servidor de desarrollo

# Producción
npm run build        # Compilar para producción
npm start            # Iniciar servidor de producción

# Lint
npm run lint         # Ejecutar ESLint
```

## 🔧 Configuración de Librerías

### Tailwind CSS
El proyecto usa **Tailwind CSS v4** para estilos. Los estilos se aplican automáticamente.

### HeroUI
Componentes React UI pre-construidos usando Tailwind CSS.

### React Toastify
Notificaciones toast para feedback del usuario.

### Mongoose
ODM para MongoDB que permite definir esquemas y realizar operaciones en BD.

## ⚙️ Tecnologías Utilizadas

| Tecnología | Versión | Propósito |
|-----------|---------|----------|
| Next.js | 16.2.9 | Framework React full-stack |
| React | 19.2.4 | Librería UI |
| TypeScript | ^5 | Tipado estático |
| Tailwind CSS | ^4 | Estilos CSS |
| MongoDB | - | Base de datos NoSQL |
| Mongoose | ^9.7.0 | ODM para MongoDB |
| Cloudinary | ^2.10.0 | Almacenamiento en nube |
| Axios | ^1.18.0 | Cliente HTTP |
| React Toastify | ^11.1.0 | Notificaciones |
| HeroUI | ^3.2.0 | Componentes UI |

## 🚨 Troubleshooting

### Error de conexión a MongoDB
- Verifica que la `MONGODB_URI` es correcta
- Asegúrate de que tu IP está en "Network Access" de MongoDB Atlas
- Verifica que el usuario y contraseña son correctos

### Error al subir imágenes a Cloudinary
- Verifica que tus credenciales de Cloudinary son correctas
- Comprueba que la variable `CLOUDINARY_API_SECRET` no está expuesta
- Asegúrate de que el archivo es una imagen válida

### Puerto 3000 en uso
```bash
# En Linux/Mac
lsof -i :3000
kill -9 <PID>

# En Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

## 📝 Notas Importantes

- Las variables de entorno sensibles (API keys, secrets) **no deben compartirse** en repositorios públicos
- El archivo `.env.local` está en `.gitignore` por seguridad
- Las imágenes se almacenan en Cloudinary (servicio externo de pago)
- MongoDB Atlas tiene un tier gratuito para desarrollo

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Para cambios importantes:
1. Fork el repositorio
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo licencia MIT.

## 👤 Autor

**Estiwar** - [GitHub](https://github.com/estiwar3883)

## 📞 Soporte

Si tienes preguntas o problemas, abre un [issue](https://github.com/estiwar3883/Galeria-de-fotos-/issues) en el repositorio.

---

**¡Gracias por usar esta aplicación de galería de fotos!**
