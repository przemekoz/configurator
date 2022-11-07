<?php

function fileLog(mixed $data): void {
	$file = 'logs/app-log.log';
	// Append a new person to the file
	$data = print_r($data, true);
	$data = "{$data}\n--------------------------------------\n";
	// Write the contents back to the file
	file_put_contents($file, $data, FILE_APPEND | LOCK_EX);
}