<?php
// src/Controller/ApiController.php
namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

class ApiController extends AbstractController
{

    #[Route(path:"/api/data", name:"api_data", methods: ["POST"])]
    public function data(Request $request): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        $response = [
            'status' => 'success',
            'message' => 'Data received successfully',
            'receivedData' => $data,
        ];
        
        return new JsonResponse($response);
    }
}
