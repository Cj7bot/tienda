# Endpoints Requeridos en el Backend Symfony

## 1. Registro de Clientes

**Endpoint:** `POST /api/register`

**Descripción:** Registra un nuevo cliente en la tabla `clientes`

**Request Body:**
```json
{
  "nombre": "Juan Pérez",
  "email": "juan@ejemplo.com", 
  "password": "MiPassword123!"
}
```

**Response Success (200):**
```json
{
  "success": true,
  "message": "Cliente registrado exitosamente",
  "cliente_id": 123
}
```

**Response Error (400):**
```json
{
  "success": false,
  "error": "El email ya está registrado"
}
```

**Ejemplo de Controller en Symfony:**
```php
<?php
// src/Controller/ApiController.php

#[Route('/api/register', methods: ['POST'])]
public function register(Request $request, EntityManagerInterface $em): JsonResponse
{
    $data = json_decode($request->getContent(), true);
    
    // Validar datos
    if (!$data['nombre'] || !$data['email'] || !$data['password']) {
        return $this->json(['success' => false, 'error' => 'Datos incompletos'], 400);
    }
    
    // Verificar si el email ya existe
    $existingClient = $em->getRepository(Cliente::class)->findOneBy(['email' => $data['email']]);
    if ($existingClient) {
        return $this->json(['success' => false, 'error' => 'El email ya está registrado'], 400);
    }
    
    // Crear nuevo cliente
    $cliente = new Cliente();
    $cliente->setNombre($data['nombre']);
    $cliente->setEmail($data['email']);
    $cliente->setPassword(password_hash($data['password'], PASSWORD_DEFAULT));
    $cliente->setFechaRegistro(new \DateTime());
    
    $em->persist($cliente);
    $em->flush();
    
    return $this->json([
        'success' => true,
        'message' => 'Cliente registrado exitosamente',
        'cliente_id' => $cliente->getId()
    ]);
}
```

## 2. Login de Clientes

**Endpoint:** `POST /api/login_check`

**Request Body:**
```json
{
  "username": "juan@ejemplo.com",
  "password": "MiPassword123!"
}
```

**Response Success:**
```json
{
  "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...",
  "username": "Juan Pérez"
}
```

## 3. Perfil de Cliente

**Endpoint:** `GET /api/profile`
**Headers:** `Authorization: Bearer {token}`

**Response:**
```json
{
  "id": 123,
  "username": "Juan Pérez", 
  "email": "juan@ejemplo.com"
}
```

## 4. Actualizar Perfil

**Endpoint:** `PUT /api/profile/update`
**Headers:** `Authorization: Bearer {token}`

**Request Body:**
```json
{
  "username": "Juan Carlos Pérez"
}
```

## 5. Logout

**Endpoint:** `POST /api/logout`
**Headers:** `Authorization: Bearer {token}`

**Response:**
```json
{
  "success": true,
  "message": "Logout exitoso"
}
```

## Configuración CORS Requerida

```yaml
# config/packages/nelmio_cors.yaml
nelmio_cors:
    defaults:
        origin_regex: true
        allow_origin: ['http://localhost:5173', 'http://localhost:5174']
        allow_methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
        allow_headers: ['Content-Type', 'Authorization', 'X-Requested-With']
        expose_headers: ['Link']
        max_age: 3600
    paths:
        '^/api/':
            allow_origin: ['http://localhost:5173', 'http://localhost:5174']
            allow_headers: ['Content-Type', 'Authorization']
            allow_methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
            max_age: 3600
```
