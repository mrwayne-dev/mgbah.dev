<?php
/**
 * Project: mgbah.dev
 * Created by: Wayne
 * Generated: 2026-03-27
 * 
 */

define('APP_ROOT', dirname(__DIR__));
define('CONFIG_PATH', APP_ROOT . '/config');
define('INCLUDES_PATH', APP_ROOT . '/includes');
define('UPLOADS_PATH', APP_ROOT . '/uploads');

require_once CONFIG_PATH . '/env.php';

define('APP_NAME', 'mgbah.dev');
define('APP_URL', 'https://mgbah.dev');
define('WHATSAPP_NUMBER',      getenv('WHATSAPP_NUMBER'));
define('GREENAPI_API_URL',     getenv('GREENAPI_API_URL'));
define('GREENAPI_INSTANCE_ID', getenv('GREENAPI_INSTANCE_ID'));
define('GREENAPI_API_TOKEN',   getenv('GREENAPI_API_TOKEN'));
define('RATE_LIMIT_MAX', 5);
define('RATE_LIMIT_WINDOW', 300);

if (getenv('APP_ENV') === 'development') {
    error_reporting(E_ALL);
    ini_set('display_errors', 1);
} else {
    error_reporting(0);
    ini_set('display_errors', 0);
}

date_default_timezone_set('UTC');

define('ASSET_VERSION', '1.0.4');
