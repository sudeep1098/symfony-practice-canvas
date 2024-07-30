<?php

namespace App\Form;

use App\Entity\Fraud;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use App\DataTransformer\AddressTransformer;

class FraudType extends AbstractType
{
    public function __construct(private readonly AddressTransformer $addressTransformer){

    }
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
            ->add('firstName')
            ->add('lastName')
            ->add('email')
            ->add('phoneNumber')
            ->add('city')
            ->add('zipcode')
            ->add('addressLine1')
        ;

        $builder->addModelTransformer($this->addressTransformer);
        dd($builder->getData());
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => Fraud::class,
        ]);
    }
}
