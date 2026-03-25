<?php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class ChatController extends Controller
{
    public function ask(Request $request)
    {
        $request->validate(['message' => 'required|string']);

        $apiKey = env('AI_API_KEY');
        $userMessage = $request->message;

        // Gọi API của Google Gemini (hoặc thay bằng Endpoint của OpenAI)
        $response = Http::withHeaders([
            'Content-Type' => 'application/json',
        ])->post("https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key={$apiKey}", [
            'contents' => [
                ['parts' => [['text' => "Bạn là một trợ lý ảo trên web đọc truyện tranh có thâm niên 10 năm. Hãy trả lời ngắn gọn, thân thiện: " . $userMessage]]]
            ]
        ]);

        if ($response->successful()) {
            // Trích xuất câu trả lời từ JSON của Gemini
            $reply = $response->json('candidates.0.content.parts.0.text');
            return response()->json(['reply' => $reply]);
        }

        return response()->json(['reply' => 'Xin lỗi, server AI đang quá tải, bạn thử lại sau nhé!'], 500);
    }
}