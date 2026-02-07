<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Stripe\Checkout\Session;
use Stripe\Stripe;

class CheckoutController extends Controller
{
    public function store(Request $request)
    {
        $user = $request->user();
        $cartItems = $user->cartItems()->with('product')->get();

        if ($cartItems->isEmpty()) {
            return back()->with('flash', 'カートが空です。');
        }

        $totalAmount = $cartItems->sum(fn ($item) => $item->product->price * $item->quantity);

        $order = $user->orders()->create([
            'status' => 'pending',
            'total_amount' => $totalAmount,
        ]);

        foreach ($cartItems as $cartItem) {
            $order->orderItems()->create([
                'product_id' => $cartItem->product_id,
                'product_name' => $cartItem->product->name,
                'product_price' => $cartItem->product->price,
                'quantity' => $cartItem->quantity,
            ]);
        }

        Stripe::setApiKey(config('services.stripe.secret'));

        $lineItems = $cartItems->map(fn ($item) => [
            'price_data' => [
                'currency' => 'jpy',
                'product_data' => [
                    'name' => $item->product->name,
                ],
                'unit_amount' => $item->product->price,
            ],
            'quantity' => $item->quantity,
        ])->toArray();

        $checkoutSession = Session::create([
            'payment_method_types' => ['card'],
            'line_items' => $lineItems,
            'mode' => 'payment',
            'success_url' => route('checkout.success') . '?session_id={CHECKOUT_SESSION_ID}',
            'cancel_url' => route('checkout.cancel'),
            'metadata' => [
                'order_id' => $order->id,
            ],
        ]);

        $order->update([
            'stripe_checkout_session_id' => $checkoutSession->id,
        ]);

        return Inertia::location($checkoutSession->url);
    }

    public function success(Request $request)
    {
        $sessionId = $request->query('session_id');

        $order = Order::where('stripe_checkout_session_id', $sessionId)
            ->with('orderItems')
            ->firstOrFail();

        return Inertia::render('Checkout/Success', [
            'order' => $order,
        ]);
    }

    public function cancel()
    {
        return Inertia::render('Checkout/Cancel');
    }
}
