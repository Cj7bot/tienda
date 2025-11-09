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

## 6. Crear Orden de Compra

**Endpoint:** `POST /api/orders`
**Headers:** `Authorization: Bearer {token}`

**Descripción:** Crea una nueva orden de compra con los productos del carrito

**Request Body:**
```json
{
  "address": {
    "departamento": "Lima",
    "provincia": "Lima",
    "distrito": "Miraflores",
    "calle": "Av. Larco",
    "numero": "123"
  },
  "deliveryOption": "express",
  "paymentMethod": "credit",
  "items": [
    {
      "id": "1",
      "cantidad": 2,
      "precio": 10.50
    }
  ],
  "subtotal": 21.00,
  "shipping": 0,
  "total": 21.00
}
```

**Response Success (201):**
```json
{
  "success": true,
  "message": "Orden creada exitosamente",
  "order_id": 456,
  "order_number": "ORD-2025-001"
}
```

**Response Error (400):**
```json
{
  "success": false,
  "error": "Carrito vacío o datos inválidos"
}
```

**Ejemplo de Controller en Symfony:**
```php
<?php
// src/Controller/OrderController.php

#[Route('/api/orders', methods: ['POST'])]
public function createOrder(Request $request, EntityManagerInterface $em): JsonResponse
{
    $data = json_decode($request->getContent(), true);
    
    // Validar datos
    if (!$data['items'] || count($data['items']) === 0) {
        return $this->json(['success' => false, 'error' => 'Carrito vacío'], 400);
    }
    
    // Obtener el usuario autenticado
    $user = $this->getUser();
    if (!$user) {
        return $this->json(['success' => false, 'error' => 'Usuario no autenticado'], 401);
    }
    
    // Crear nueva orden
    $order = new Order();
    $order->setCliente($user);
    $order->setAddress(json_encode($data['address']));
    $order->setDeliveryOption($data['deliveryOption']);
    $order->setPaymentMethod($data['paymentMethod']);
    $order->setSubtotal($data['subtotal']);
    $order->setShipping($data['shipping']);
    $order->setTotal($data['total']);
    $order->setStatus('pending');
    $order->setCreatedAt(new \DateTime());
    
    // Crear items de la orden
    foreach ($data['items'] as $item) {
        $orderItem = new OrderItem();
        $orderItem->setOrder($order);
        $orderItem->setProductId($item['id']);
        $orderItem->setQuantity($item['cantidad']);
        $orderItem->setPrice($item['precio']);
        $em->persist($orderItem);
    }
    
    $em->persist($order);
    $em->flush();
    
    return $this->json([
        'success' => true,
        'message' => 'Orden creada exitosamente',
        'order_id' => $order->getId(),
        'order_number' => 'ORD-' . date('Y') . '-' . str_pad($order->getId(), 3, '0', STR_PAD_LEFT)
    ], 201);
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
