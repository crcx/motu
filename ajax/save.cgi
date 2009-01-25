#! /usr/bin/env perl
use CGI qw/:standard/;
CGI::initialize_globals();

$| = 1;

print header;

$data = param('tib') || '(No input)';

open ($motu, '>motu.txt');
print $motu $data;
close ($motu);
