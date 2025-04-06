# File Processor Web App

Una aplicación web interactiva para cargar, procesar y convertir archivos de varios formatos a texto plano. Permite procesar múltiples archivos simultáneamente y descargar el resultado en un archivo concatenado.

Puedes probar la pagina desplegada aqui [https://nahuelmorena.github.io/PreprocessorFileApp/](https://nahuelmorena.github.io/PreprocessorFileApp/)

## Interfaz de la App
<p align="center">
    <img src="/public/interfaz.png" alt="Vista de la interfaz de la App" width="700">
</p>
<p align="center"><i>Figura 1. Vista de la interfaz de la App</i></p>

## 🚀 Características

- **Arrastrar y soltar archivos**: Interfaz intuitiva para cargar archivos directamente desde tu explorador.
- **Procesamiento múltiple**: Admite varios formatos de archivo, incluyendo `.txt`, `.csv`, `.json`, `.xml` y `.arff`.
- **Descarga consolidada**: Combina todos los archivos procesados en un único archivo de texto plano.
- **Fácil extensibilidad**: Implementación basada en un patrón de diseño estratégico para admitir nuevos formatos fácilmente.

## 📂 Tabla de Contenidos

1. [Instalación](#instalación)
2. [Uso](#uso)
3. [Estructura del Proyecto](#estructura-del-proyecto)
4. [Tecnologías Utilizadas](#tecnologías-utilizadas)

## 🛠 Instalación

### Requisitos previos
- [Node.js](https://nodejs.org/) (v16 o superior)
- [Git](https://git-scm.com/)

### Pasos para instalar

1. Clona este repositorio:
   ```bash
   git clone git@github.com:NahuelMorena/PreprocessorFileApp.git
   cd file-processor-web-app
   ```
2. Instala las dependencias:
   ```bash
   npm install
   ```
3. Inicia el servidor de desarrollo:
   ```bash
   npm run dev
   ```
## 🎮 Uso

1. Abre la aplicación en tu navegador (normalmente en [http://localhost:5173](http://localhost:5173)).
2. Arrastra o selecciona los archivos que deseas procesar.
3. Haz clic en **"Procesar Archivos"** para generar y descargar el archivo consolidado en texto plano.

## 🧱 Estructura del Proyecto

```plaintext
src/
├── Dropzone.tsx/                  # Componente principal para cargar y procesar archivos.
│           
├── utils/
│    ├── ConcatenateFiles.ts       # Utilidad para combinar archivos procesados.
│    ├── FileProcessorContext.ts   # Contexto estratégico para ejecutar procesadores.
│    └── processors/
│        ├── FileProcessor.ts      # Procesador base (clase abstracta).
│        ├── ARFFProcessor.ts      # Procesador para archivos .arff.
│        ├── CSVProcessor.ts       # Procesador para archivos .csv.
│        ├── JSONProcessor.ts      # Procesador para archivos .json.
│        ├── XMLProcessor.ts       # Procesador para archivos .xml.
│        └── TXTProcessor.ts       # Procesador para archivos .txt.
```
## 🛠️ Tecnoligías Utilizadas
- **[Vite](https://vitejs.dev/):** Herramienta para configuración rápida de proyectos web.
- **React:** Biblioteca para construir interfaces de usuario.
- **TypeScript:** Superset de JavaScript con tipado estático.
- **FileReader API:** API para manejar archivos en el navegador.
- **react-icons/fa:** Proporciona un conjunto de iconos de Font Awesome para usarlis fácilmente en proyectos React.
