<?php

namespace Database\Seeders;

use App\Models\Product;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    public function run(): void
    {
        $products = [
            [
                'name' => '木製コースター（4枚セット）',
                'description' => '天然木を使用した温かみのあるコースター。水滴をしっかり吸収し、テーブルを守ります。',
                'price' => 1200,
                'is_active' => true,
            ],
            [
                'name' => 'リネンポーチ',
                'description' => '上質なリネン素材のポーチ。化粧品や小物の収納にぴったりです。',
                'price' => 2500,
                'is_active' => true,
            ],
            [
                'name' => 'アロマキャンドル（ラベンダー）',
                'description' => '天然エッセンシャルオイル使用。リラックスタイムにおすすめです。燃焼時間約30時間。',
                'price' => 1800,
                'is_active' => true,
            ],
            [
                'name' => 'ガラスフラワーベース',
                'description' => 'シンプルで美しいガラス製の花瓶。一輪挿しにも、ドライフラワーにも。',
                'price' => 3200,
                'is_active' => true,
            ],
            [
                'name' => 'コットンブランケット',
                'description' => 'オーガニックコットン100%。肌触りの良いブランケットです。サイズ：140×200cm',
                'price' => 8500,
                'is_active' => true,
            ],
            [
                'name' => 'レザーキーケース',
                'description' => '本革を使用したシンプルなキーケース。経年変化をお楽しみいただけます。',
                'price' => 4800,
                'is_active' => true,
            ],
            [
                'name' => '陶器のマグカップ',
                'description' => '職人手作りの陶器マグ。容量約300ml。電子レンジ・食洗機対応。',
                'price' => 2200,
                'is_active' => true,
            ],
            [
                'name' => 'ウォールクロック（ナチュラル）',
                'description' => 'シンプルな木製の壁掛け時計。静音設計で寝室にもおすすめ。直径25cm。',
                'price' => 5500,
                'is_active' => true,
            ],
            [
                'name' => '真鍮のペーパーウェイト',
                'description' => '重厚感のある真鍮製ペーパーウェイト。デスクのアクセントに。',
                'price' => 3800,
                'is_active' => false,
            ],
            [
                'name' => 'ルームフレグランス',
                'description' => 'ウッディな香りのリードディフューザー。容量100ml、約2ヶ月持続。',
                'price' => 2800,
                'is_active' => true,
            ],
        ];

        foreach ($products as $product) {
            Product::create($product);
        }
    }
}
