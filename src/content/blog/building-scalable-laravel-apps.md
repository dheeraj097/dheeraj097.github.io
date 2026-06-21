---
title: "Building Scalable Laravel Applications: Lessons from 10 Years"
description: "A deep dive into architecture patterns, queue systems, caching strategies, and database optimization techniques that help Laravel applications scale to millions of users."
date: 2024-12-15
tags: ["Laravel", "PHP", "Architecture", "Scaling", "Backend"]
---

After a decade of building and scaling Laravel applications — from small MVPs to platforms handling millions of requests daily — I've accumulated a set of patterns and practices that consistently deliver results. Here's what I've learned.

## Start with the Right Architecture

The biggest mistake I see in Laravel projects is treating the framework as the architecture. Laravel is a tool, not an architecture. Your application needs a clear separation of concerns from day one.

### Service Layer Pattern

Instead of stuffing business logic into controllers or models, introduce a service layer:

```php
// app/Services/OrderService.php
class OrderService
{
    public function __construct(
        private PaymentGateway $payment,
        private InventoryService $inventory,
        private NotificationService $notifications
    ) {}

    public function process(Order $order): OrderResult
    {
        $this->inventory->reserve($order->items);
        $charge = $this->payment->charge($order->total, $order->paymentMethod);
        $this->notifications->orderConfirmed($order);

        return new OrderResult($order, $charge);
    }
}
```

This keeps controllers thin and makes business logic testable in isolation.

### Repository Pattern (When It Makes Sense)

I don't always use repositories — for simple CRUD, Eloquent is fine directly. But when queries get complex or you need caching at the data layer:

```php
class ProductRepository
{
    public function findPopular(int $limit = 20): Collection
    {
        return Cache::remember("products:popular:{$limit}", 3600, fn () =>
            Product::withCount('orders')
                ->where('active', true)
                ->orderByDesc('orders_count')
                ->limit($limit)
                ->get()
        );
    }
}
```

## Queue Everything That Can Wait

This is perhaps the single most impactful scaling technique. If the user doesn't need an immediate response, queue it.

### What to Queue

- Email and notification sending
- Image/video processing
- Report generation
- Third-party API calls
- Search index updates
- Analytics event processing

### Queue Configuration for Scale

```php
// Use Redis for your queue driver
QUEUE_CONNECTION=redis

// Separate queues by priority
class ProcessOrder implements ShouldQueue
{
    public $queue = 'high';
    public $tries = 3;
    public $backoff = [30, 60, 120];
}
```

Run separate workers for different queues with appropriate concurrency:

```bash
php artisan queue:work --queue=high --workers=4
php artisan queue:work --queue=default --workers=2
php artisan queue:work --queue=low --workers=1
```

## Caching Strategy

A well-designed caching strategy can reduce database load by 80%+ without introducing complexity nightmares.

### Multi-Layer Caching

I use a three-layer approach:

1. **Application cache** (Redis) — query results, computed values
2. **HTTP cache** — response caching with proper headers
3. **CDN cache** — static assets and API responses where appropriate

### Cache Invalidation

The hardest problem in computer science, right? Here's my approach:

```php
// Event-driven cache invalidation
class ProductUpdated
{
    public function __construct(public Product $product) {}
}

class InvalidateProductCache
{
    public function handle(ProductUpdated $event): void
    {
        $product = $event->product;
        Cache::forget("product:{$product->id}");
        Cache::forget("products:popular:20");
        Cache::tags(['product-listings'])->flush();
    }
}
```

Tag-based caching with Redis makes group invalidation manageable.

## Database Optimization

### Indexing Strategy

The number one performance issue I encounter in Laravel apps: missing or incorrect indexes.

```php
// Migration with thoughtful indexing
Schema::create('orders', function (Blueprint $table) {
    $table->id();
    $table->foreignId('user_id')->constrained();
    $table->string('status');
    $table->decimal('total', 10, 2);
    $table->timestamps();

    // Composite index for common query patterns
    $table->index(['user_id', 'status', 'created_at']);
    $table->index(['status', 'created_at']); // Admin dashboard queries
});
```

### N+1 Query Prevention

Use Laravel's `preventLazyLoading` in development:

```php
Model::preventLazyLoading(!app()->isProduction());
```

And always eager load relationships:

```php
$orders = Order::with(['user', 'items.product', 'shipping'])
    ->where('status', 'pending')
    ->paginate(25);
```

### Read Replicas

For read-heavy applications, configure read/write splitting:

```php
'mysql' => [
    'read' => [
        'host' => [env('DB_READ_HOST_1'), env('DB_READ_HOST_2')],
    ],
    'write' => [
        'host' => [env('DB_WRITE_HOST')],
    ],
    // ... rest of config
],
```

## Horizontal Scaling Considerations

When you're ready to move beyond a single server:

### Stateless Application Servers

- Store sessions in Redis, not files
- Use S3 or similar for file uploads (never local disk)
- Use Redis for cache (not file-based)
- Make sure scheduled tasks run on only one instance

### Load Balancer Health Checks

```php
Route::get('/health', function () {
    try {
        DB::connection()->getPdo();
        Cache::store('redis')->get('health-check');
        return response('OK', 200);
    } catch (\Exception $e) {
        return response('UNHEALTHY', 503);
    }
});
```

## Monitoring and Observability

You can't optimize what you can't measure. My essential monitoring stack:

- **Laravel Telescope** in development
- **Application-level metrics** — response times, queue depths, cache hit rates
- **Database slow query log** — anything over 100ms gets flagged
- **Error tracking** (Sentry/Bugsnag) with proper context
- **Custom dashboards** for business metrics

## Key Takeaways

1. **Architecture first** — invest time in clean separation of concerns
2. **Queue aggressively** — async by default, sync only when necessary
3. **Cache strategically** — multi-layer with event-driven invalidation
4. **Index intentionally** — based on actual query patterns, not guesses
5. **Monitor everything** — you can't fix what you can't see
6. **Scale horizontally** — design for statelessness from the start

These patterns aren't theoretical — they've been battle-tested across dozens of production applications serving real users at scale. Start applying them incrementally, measure the impact, and iterate.

The best architecture is one that evolves with your application's needs while maintaining the clarity that lets your team move fast with confidence.
