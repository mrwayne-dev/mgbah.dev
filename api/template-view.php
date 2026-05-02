<?php
$map = [
    'hotel-auralis'    => '01_hotel_auralis.html',
    'hotel-maison-eko' => '02_hotel_maison_eko.html',
    'law-firm'         => '03_law_adamasingba.html',
    'dental'           => '04_dental_smileco.html',
    'school'           => '05_school_greenfield.html',
    'real-estate'      => '06_realestate_slatecourt.html',
];

$slug = $_GET['slug'] ?? '';

if (!isset($map[$slug])) {
    http_response_code(404);
    exit('Not found');
}

$file = dirname(__DIR__) . '/assets/js/pages/templates/' . $map[$slug];

if (!file_exists($file)) {
    http_response_code(404);
    exit('Not found');
}

header('Content-Type: text/html; charset=UTF-8');
readfile($file);
