<?php

function fileLog(mixed $data): void
{
	$file = 'logs/frontend-app-log.log';
	$date = date('Y-m-d H:i:s');
	// Append a new person to the file
	$data = print_r($data, true);
	$data = "[{$date}] {$data}\n";
	// Write the contents back to the file
	file_put_contents($file, $data, FILE_APPEND | LOCK_EX);
}
