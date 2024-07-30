<?php

namespace App\Controller;

use App\Entity\Fraud;
use App\Repository\FraudRepository;
use App\Repository\OrderRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Serializer\SerializerInterface;

class DefaultController extends AbstractController
{
    #[Route('/home', name: 'home')]
    public function index(Request $request, EntityManagerInterface $em): Response
    {
        return $this->render('index.html.twig' );
    }

    #[Route('/fraud', name: 'fraud')]
    public function edit(Request $request, EntityManagerInterface $em, SerializerInterface $serializer): Response
    {
        $id = $request->get('id');
        if($id){
            $fraud = $em->getRepository(Fraud::class)->find(['id' => $id]);
        }else{
            $fraud = new Fraud();
        }
        $jsonData = $serializer->serialize($fraud, 'json');

        // Return the JSON data in the response
        // return new JsonResponse($jsonData, Response::HTTP_OK, [], true);
        return $this->render('fraud.html.twig', ['fraud' => $fraud] );   
    }

    #[Route('/frauddd', name: 'frauddd')]
    public function message(EntityManagerInterface $entityManagerInterface, FraudRepository $fraudRepository, OrderRepository $orderRepository)
    {
        dd($fraudRepository->fetchAll());
    }
}
