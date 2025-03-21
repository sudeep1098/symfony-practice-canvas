<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

class CanvasController extends AbstractController
{
    #[Route('/', name: 'canvas')]
    public function index(): Response
    {
        return $this->render('canvas/index.html.twig', [
            'controller_name' => 'CanvasController',
        ]);
    }
}
