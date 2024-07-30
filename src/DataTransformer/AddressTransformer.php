<?php

namespace App\DataTransformer;

use Symfony\Component\Form\DataTransformerInterface;

class AddressTransformer implements DataTransformerInterface
{
    public function transform(mixed $value): mixed
    {
        return $value;
    }

    public function reverseTransform(mixed $value): mixed
    {
        if (!is_array($value)) {
            throw new \UnexpectedValueException('Expected an array.');
        }

        // Transform the value
        $transformed = $value;

        // Additional transformation logic if needed
        // Example:
        $transformed = [
            ...$transformed,
        ];

        return $transformed;
    }
}