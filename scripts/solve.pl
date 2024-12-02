#!/usr/bin/perl
use 5.30.0;
use warnings FATAL => 'all';

my $pat = shift || die;

my @words = `zcat priv/data/words.txt.gz`;
chomp @words;

say("pat = $pat");
say("");

for my $word (@words) {
    say $word if match($pat, $word);
}

sub match {
    my ($pat, $word) = @_;
    return 0 unless length($word) == length($pat);

    for (my $ii = 0; $ii < length($word); ++$ii) {
        my $aa = substr($word, $ii, 1);
        my $bb = substr($pat, $ii, 1);
        if ($bb ne "-" && $aa ne $bb) {
            return 0;
        }
    }
    return 1;
}
