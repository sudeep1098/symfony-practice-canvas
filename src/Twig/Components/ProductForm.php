<?php
namespace App\Twig\Components;

use App\Entity\Product;
use App\Form\ProductType;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Form\FormInterface;
use Symfony\UX\LiveComponent\Attribute\AsLiveComponent;
use Symfony\UX\LiveComponent\Attribute\LiveProp;
use Symfony\UX\LiveComponent\ComponentWithFormTrait;
use Symfony\UX\LiveComponent\DefaultActionTrait;

#[AsLiveComponent]
class ProductForm extends AbstractController
{
    use DefaultActionTrait;
    use ComponentWithFormTrait;

    // #[LiveProp]
    // public ?Product $product = null;

    protected function instantiateForm(): FormInterface
    {
        return $this->createForm(ProductType::class);
    }
}