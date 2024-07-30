<?php
namespace App\Twig\Components;

use App\Entity\Fraud;
use App\Form\FraudType;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\BrowserKit\Response;
use Symfony\Component\Form\FormInterface;
use Symfony\UX\LiveComponent\Attribute\AsLiveComponent;
use Symfony\UX\LiveComponent\Attribute\LiveAction;
use Symfony\UX\LiveComponent\Attribute\LiveProp;
use Symfony\UX\LiveComponent\ComponentWithFormTrait;
use Symfony\UX\LiveComponent\DefaultActionTrait;

#[AsLiveComponent(
    name: "FraudForm",
    template: "/components/fraud.html.twig"
)]
class FraudForm extends AbstractController
{
    use DefaultActionTrait;
    use ComponentWithFormTrait;

    #[LiveProp(fieldName: 'fraudEntity')]
    public ?Fraud $fraud = null;

    protected function instantiateForm(): FormInterface
    {
        return $this->createForm(FraudType::class, $this->fraud);
    }

#[LiveAction]
public function save(EntityManagerInterface $entityManager)
{
    // $this->initialFormData will *not* contain the latest data yet!
    // submit the form
    $this->submitForm();

    // now you can access the latest data
    $fraud = $this->getForm()->getData();
    // (same as above)
    $entityManager->persist($fraud);
    $entityManager->flush();

    $this->addFlash('success', 'Post saved!');

    return $this->redirectToRoute('fraud', [
        'id' => $fraud->getId(),
    ]);
}
}