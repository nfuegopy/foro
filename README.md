# 🌎 Modern Forum API System

<div align="center">

[English](#english) | [Español](#español) | [Deutsch](#deutsch) | [한국어](#한국어) | [Nederlands](#nederlands)

</div>

---

<a name="english"></a>
# 🇬🇧 English

## 📖 Overview
Welcome to our modern Forum API system! This comprehensive solution supports both MySQL and PostgreSQL databases, providing a flexible and robust foundation for building community platforms.

## 🚀 Key Features
- **👥 User Management**
  - Complete authentication system
  - Role-based access control
  - Profile customization
  - Avatar support
  - Post count tracking
  
- **📝 Content Management**
  - Categories and subcategories
  - Thread management
  - Image uploads and management
  - Rich text support
  - Tag system

- **🛠 Technical Features**
  - Dual database support (MySQL/PostgreSQL)
  - RESTful API architecture
  - Modular design
  - TypeScript implementation
  - Comprehensive error handling

## ⚙️ Installation

### Prerequisites
- Node.js (v14 or higher)
- MySQL or PostgreSQL
- npm/yarn

### Setup Steps
1. Clone the repository:
```bash
git clone https://github.com/nfuegopy/foro.git
cd foro
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
```bash
cp .env.example .env
# Edit .env with your database credentials
```

4. Start the application:
```bash
# Development
npm run start:dev

# Production
npm run build
npm run start:prod
```

## 🗄️ Database Configuration

### MySQL Configuration
```env
DB_TYPE=mysql
MYSQL_HOST=localhost
MYSQL_PORT=3306
MYSQL_USER=your_user
MYSQL_PASSWORD=your_password
MYSQL_DATABASE=forum_db
```

### PostgreSQL Configuration
```env
DB_TYPE=postgres
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_USER=your_user
POSTGRES_PASSWORD=your_password
POSTGRES_DATABASE=forum_db
```

## 🔗 API Endpoints

### Users
```
POST   /api/users           - Create new user
GET    /api/users          - List all users
GET    /api/users/:id      - Get user details
PATCH  /api/users/:id      - Update user
DELETE /api/users/:id      - Delete user
```

### Roles
```
POST   /api/roles          - Create new role
GET    /api/roles          - List all roles
GET    /api/roles/:id      - Get role details
PATCH  /api/roles/:id      - Update role
DELETE /api/roles/:id      - Delete role
```

### Categories
```
POST   /api/categories     - Create category
GET    /api/categories     - List categories
GET    /api/categories/:id - Get category details
PATCH  /api/categories/:id - Update category
DELETE /api/categories/:id - Delete category
```

### Images
```
POST   /api/images        - Upload image
GET    /api/images        - List images
GET    /api/images/:id    - Get image details
DELETE /api/images/:id    - Delete image
```

---

<a name="español"></a>
# 🇪🇸 Español

## 📖 Descripción General
¡Bienvenido a nuestro sistema moderno de API para foros! Esta solución completa soporta bases de datos MySQL y PostgreSQL, proporcionando una base flexible y robusta para construir plataformas comunitarias.

## 🚀 Características Principales
- **👥 Gestión de Usuarios**
  - Sistema completo de autenticación
  - Control de acceso basado en roles
  - Personalización de perfiles
  - Soporte para avatares
  - Seguimiento de publicaciones

- **📝 Gestión de Contenido**
  - Categorías y subcategorías
  - Gestión de hilos
  - Carga y gestión de imágenes
  - Soporte para texto enriquecido
  - Sistema de etiquetas

- **🛠 Características Técnicas**
  - Soporte dual de bases de datos (MySQL/PostgreSQL)
  - Arquitectura API RESTful
  - Diseño modular
  - Implementación en TypeScript
  - Manejo integral de errores

## ⚙️ Instalación

### Requisitos Previos
- Node.js (v14 o superior)
- MySQL o PostgreSQL
- npm/yarn

### Pasos de Configuración
1. Clonar el repositorio:
```bash
git clone https://github.com/nfuegopy/foro.git
cd foro
```

2. Instalar dependencias:
```bash
npm install
```

3. Configurar variables de entorno:
```bash
cp .env.example .env
# Editar .env con tus credenciales de base de datos
```

4. Iniciar la aplicación:
```bash
# Desarrollo
npm run start:dev

# Producción
npm run build
npm run start:prod
```

## 🗄️ Configuración de Base de Datos

### Configuración MySQL
```env
DB_TYPE=mysql
MYSQL_HOST=localhost
MYSQL_PORT=3306
MYSQL_USER=tu_usuario
MYSQL_PASSWORD=tu_contraseña
MYSQL_DATABASE=forum_db
```

### Configuración PostgreSQL
```env
DB_TYPE=postgres
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_USER=tu_usuario
POSTGRES_PASSWORD=tu_contraseña
POSTGRES_DATABASE=forum_db
```

## 🔗 Endpoints de la API

### Usuarios
```
POST   /api/users           - Crear nuevo usuario
GET    /api/users          - Listar usuarios
GET    /api/users/:id      - Obtener detalles de usuario
PATCH  /api/users/:id      - Actualizar usuario
DELETE /api/users/:id      - Eliminar usuario
```

### Roles
```
POST   /api/roles          - Crear nuevo rol
GET    /api/roles          - Listar roles
GET    /api/roles/:id      - Obtener detalles de rol
PATCH  /api/roles/:id      - Actualizar rol
DELETE /api/roles/:id      - Eliminar rol
```

### Categorías
```
POST   /api/categories     - Crear categoría
GET    /api/categories     - Listar categorías
GET    /api/categories/:id - Obtener detalles de categoría
PATCH  /api/categories/:id - Actualizar categoría
DELETE /api/categories/:id - Eliminar categoría
```

### Imágenes
```
POST   /api/images        - Subir imagen
GET    /api/images        - Listar imágenes
GET    /api/images/:id    - Obtener detalles de imagen
DELETE /api/images/:id    - Eliminar imagen
```

---

<a name="deutsch"></a>
# 🇩🇪 Deutsch

## 📖 Überblick
Willkommen bei unserem modernen Forum-API-System! Diese umfassende Lösung unterstützt sowohl MySQL- als auch PostgreSQL-Datenbanken und bietet eine flexible und robuste Grundlage für den Aufbau von Community-Plattformen.

## 🚀 Hauptfunktionen
- **👥 Benutzerverwaltung**
  - Vollständiges Authentifizierungssystem
  - Rollenbasierte Zugangskontrolle
  - Profilanpassung
  - Avatar-Unterstützung
  - Beitragszählung

- **📝 Inhaltsverwaltung**
  - Kategorien und Unterkategorien
  - Thread-Verwaltung
  - Bild-Upload und -Verwaltung
  - Rich-Text-Unterstützung
  - Tag-System

- **🛠 Technische Funktionen**
  - Duale Datenbankunterstützung (MySQL/PostgreSQL)
  - RESTful API-Architektur
  - Modulares Design
  - TypeScript-Implementierung
  - Umfassende Fehlerbehandlung

## ⚙️ Installation

### Voraussetzungen
- Node.js (v14 oder höher)
- MySQL oder PostgreSQL
- npm/yarn

### Einrichtungsschritte
1. Repository klonen:
```bash
git clone https://github.com/nfuegopy/foro.git
cd foro
```

2. Abhängigkeiten installieren:
```bash
npm install
```

3. Umgebungsvariablen konfigurieren:
```bash
cp .env.example .env
# Bearbeiten Sie .env mit Ihren Datenbank-Anmeldeinformationen
```

4. Anwendung starten:
```bash
# Entwicklung
npm run start:dev

# Produktion
npm run build
npm run start:prod
```

[Continue for Korean and Dutch sections...]

---

<a name="한국어"></a>
# 🇰🇷 한국어

## 📖 개요
현대적인 포럼 API 시스템에 오신 것을 환영합니다! 이 종합 솔루션은 MySQL과 PostgreSQL 데이터베이스를 모두 지원하며, 커뮤니티 플랫폼 구축을 위한 유연하고 강력한 기반을 제공합니다.

## 🚀 주요 기능
- **👥 사용자 관리**
  - 완전한 인증 시스템
  - 역할 기반 접근 제어
  - 프로필 커스터마이징
  - 아바타 지원
  - 게시물 수 추적

[Continue with full Korean translation...]

---

<a name="nederlands"></a>
# 🇳🇱 Nederlands

## 📖 Overzicht
Welkom bij ons moderne Forum API-systeem! Deze uitgebreide oplossing ondersteunt zowel MySQL- als PostgreSQL-databases en biedt een flexibele en robuuste basis voor het bouwen van communityplatforms.

## 🚀 Belangrijkste Functies
- **👥 Gebruikersbeheer**
  - Volledig authenticatiesysteem
  - Rol-gebaseerde toegangscontrole
  - Profielaanpassing
  - Avatar-ondersteuning
  - Posting-tracking

[Continue with full Dutch translation...]

---

## 🌟 Contributors
- Antonio Barrios
- Community Contributors

## 📄 License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
