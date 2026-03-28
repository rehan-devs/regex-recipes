import { Recipe } from '../types';

export const recipes: Recipe[] = [
  // ═══════════════════════════════════════════════════
  // VALIDATION
  // ═══════════════════════════════════════════════════
  {
    slug: 'email-address',
    name: 'Email Address',
    icon: '📧',
    category: 'validation',
    description: 'Validate standard email address formats',
    pattern: '[a-zA-Z0-9._%+\\-]+@[a-zA-Z0-9.\\-]+\\.[a-zA-Z]{2,}',
    defaultFlags: 'g',
    sampleTestString:
      'Valid: hello@gmail.com, dev.user@company.org, test+tag@domain.co.uk\nInvalid: not-an-email, @missing.com, user@, hello@.com, @.com',
    edgeCases: [
      { input: 'hello@gmail.com', shouldMatch: true, explanation: 'Standard email' },
      { input: 'user.name@domain.co.uk', shouldMatch: true, explanation: 'Dots in name + subdomain TLD' },
      { input: 'test+tag@company.org', shouldMatch: true, explanation: 'Plus addressing' },
      { input: 'user@localhost', shouldMatch: false, explanation: 'No TLD' },
      { input: '@missing.com', shouldMatch: false, explanation: 'No local part' },
      { input: 'user@.com', shouldMatch: false, explanation: 'Missing domain name' },
    ],
    codeSnippets: {
      javascript: `const emailRegex = /[a-zA-Z0-9._%+\\-]+@[a-zA-Z0-9.\\-]+\\.[a-zA-Z]{2,}/g;

function isValidEmail(email) {
  return /^[a-zA-Z0-9._%+\\-]+@[a-zA-Z0-9.\\-]+\\.[a-zA-Z]{2,}$/.test(email);
}

function findEmails(text) {
  return text.match(emailRegex) || [];
}`,
      python: `import re

email_pattern = r'[a-zA-Z0-9._%+\\-]+@[a-zA-Z0-9.\\-]+\\.[a-zA-Z]{2,}'

def is_valid_email(email: str) -> bool:
    return bool(re.fullmatch(email_pattern, email))

def find_emails(text: str) -> list[str]:
    return re.findall(email_pattern, text)`,
      go: `package main

import "regexp"

var emailRegex = regexp.MustCompile(` + '`[a-zA-Z0-9._%+\\-]+@[a-zA-Z0-9.\\-]+\\.[a-zA-Z]{2,}`' + `)

func isValidEmail(email string) bool {
    return emailRegex.MatchString(email)
}

func findEmails(text string) []string {
    return emailRegex.FindAllString(text, -1)
}`,
      php: `<?php
$pattern = '/[a-zA-Z0-9._%+\\-]+@[a-zA-Z0-9.\\-]+\\.[a-zA-Z]{2,}/';

function isValidEmail(string $email): bool {
    return preg_match($pattern, $email) === 1;
}

function findEmails(string $text): array {
    preg_match_all($pattern, $text, $matches);
    return $matches[0];
}`,
      java: `import java.util.regex.*;
import java.util.*;

public class EmailValidator {
    private static final Pattern EMAIL =
        Pattern.compile("[a-zA-Z0-9._%+\\\\-]+@[a-zA-Z0-9.\\\\-]+\\\\.[a-zA-Z]{2,}");

    public static boolean isValid(String email) {
        return EMAIL.matcher(email).matches();
    }

    public static List<String> findAll(String text) {
        List<String> results = new ArrayList<>();
        Matcher m = EMAIL.matcher(text);
        while (m.find()) results.add(m.group());
        return results;
    }
}`,
    },
    tags: ['email', 'mail', 'validate', 'contact', 'address'],
    difficulty: 'beginner',
  },

  {
    slug: 'url',
    name: 'URL',
    icon: '🔗',
    category: 'validation',
    description: 'Match HTTP and HTTPS URLs',
    pattern: 'https?:\\/\\/[\\w\\-]+(\\.[\\w\\-]+)+([\\w.,@?^=%&:/~+#\\-]*[\\w@?^=%&/~+#\\-])?',
    defaultFlags: 'g',
    sampleTestString:
      'Visit https://example.com or http://www.test.org/path?query=1&foo=bar\nAlso https://sub.domain.co.uk/page#section\nNot URLs: ftp://files.com, just-text, www.incomplete',
    edgeCases: [
      { input: 'https://example.com', shouldMatch: true, explanation: 'Simple HTTPS URL' },
      { input: 'http://www.test.org/path?q=1', shouldMatch: true, explanation: 'With path and query' },
      { input: 'https://sub.domain.co.uk/page#section', shouldMatch: true, explanation: 'Subdomain + fragment' },
      { input: 'ftp://files.com', shouldMatch: false, explanation: 'FTP protocol not matched' },
      { input: 'www.example.com', shouldMatch: false, explanation: 'Missing protocol' },
    ],
    codeSnippets: {
      javascript: `const urlRegex = /https?:\\/\\/[\\w\\-]+(\\.[\\w\\-]+)+([\\w.,@?^=%&:/~+#\\-]*[\\w@?^=%&/~+#\\-])?/g;

function isValidUrl(url) {
  return /^https?:\\/\\/[\\w\\-]+(\\.[\\w\\-]+)+([\\w.,@?^=%&:/~+#\\-]*[\\w@?^=%&/~+#\\-])?$/.test(url);
}

function findUrls(text) {
  return text.match(urlRegex) || [];
}`,
      python: `import re

url_pattern = r'https?://[\\w\\-]+(\\.[\\w\\-]+)+([\\w.,@?^=%&:/~+#\\-]*[\\w@?^=%&/~+#\\-])?'

def is_valid_url(url: str) -> bool:
    return bool(re.fullmatch(url_pattern, url))

def find_urls(text: str) -> list[str]:
    return [m.group() for m in re.finditer(url_pattern, text)]`,
      go: `package main

import "regexp"

var urlRegex = regexp.MustCompile(` + '`https?://[\\w\\-]+(\\.[\\w\\-]+)+([\\w.,@?^=%&:/~+#\\-]*[\\w@?^=%&/~+#\\-])?`' + `)

func findUrls(text string) []string {
    return urlRegex.FindAllString(text, -1)
}`,
      php: `<?php
$pattern = '/https?:\\/\\/[\\w\\-]+(\\.[\\w\\-]+)+([\\w.,@?^=%&:\\/~+#\\-]*[\\w@?^=%&\\/~+#\\-])?/';

function findUrls(string $text): array {
    preg_match_all($pattern, $text, $matches);
    return $matches[0];
}`,
      java: `import java.util.regex.*;
import java.util.*;

public class UrlExtractor {
    private static final Pattern URL =
        Pattern.compile("https?://[\\\\w\\\\-]+(\\\\.[\\\\w\\\\-]+)+([\\\\w.,@?^=%&:/~+#\\\\-]*[\\\\w@?^=%&/~+#\\\\-])?");

    public static List<String> findAll(String text) {
        List<String> results = new ArrayList<>();
        Matcher m = URL.matcher(text);
        while (m.find()) results.add(m.group());
        return results;
    }
}`,
    },
    tags: ['url', 'link', 'website', 'http', 'https', 'web'],
    difficulty: 'intermediate',
  },

  {
    slug: 'phone-us',
    name: 'Phone Number (US)',
    icon: '📱',
    category: 'validation',
    description: 'Match US phone number formats',
    pattern: '\\(?\\d{3}\\)?[\\-\\.\\s]?\\d{3}[\\-\\.\\s]?\\d{4}',
    defaultFlags: 'g',
    sampleTestString:
      'Call us: (555) 123-4567 or 555.123.4567 or 555-123-4567\nAlso: 5551234567\nInvalid: 123-45-6789, 55-123-4567',
    edgeCases: [
      { input: '(555) 123-4567', shouldMatch: true, explanation: 'Standard format with parens' },
      { input: '555-123-4567', shouldMatch: true, explanation: 'Dashes' },
      { input: '555.123.4567', shouldMatch: true, explanation: 'Dots' },
      { input: '5551234567', shouldMatch: true, explanation: 'No separators' },
      { input: '55-123-4567', shouldMatch: false, explanation: 'Area code too short' },
    ],
    codeSnippets: {
      javascript: `const phoneRegex = /\\(?\\d{3}\\)?[\\-\\.\\s]?\\d{3}[\\-\\.\\s]?\\d{4}/g;

function findPhoneNumbers(text) {
  return text.match(phoneRegex) || [];
}`,
      python: `import re

phone_pattern = r'\\(?\\d{3}\\)?[\\-\\.\\s]?\\d{3}[\\-\\.\\s]?\\d{4}'

def find_phones(text: str) -> list[str]:
    return re.findall(phone_pattern, text)`,
      go: `package main

import "regexp"

var phoneRegex = regexp.MustCompile(` + '`\\(?\\d{3}\\)?[\\-\\.\\s]?\\d{3}[\\-\\.\\s]?\\d{4}`' + `)

func findPhones(text string) []string {
    return phoneRegex.FindAllString(text, -1)
}`,
      php: `<?php
$pattern = '/\\(?\\d{3}\\)?[\\-\\.\\s]?\\d{3}[\\-\\.\\s]?\\d{4}/';

function findPhones(string $text): array {
    preg_match_all($pattern, $text, $matches);
    return $matches[0];
}`,
      java: `import java.util.regex.*;
import java.util.*;

public class PhoneFinder {
    private static final Pattern PHONE =
        Pattern.compile("\\\\(?\\\\d{3}\\\\)?[\\\\-\\\\.\\\\s]?\\\\d{3}[\\\\-\\\\.\\\\s]?\\\\d{4}");

    public static List<String> findAll(String text) {
        List<String> results = new ArrayList<>();
        Matcher m = PHONE.matcher(text);
        while (m.find()) results.add(m.group());
        return results;
    }
}`,
    },
    tags: ['phone', 'telephone', 'number', 'mobile', 'call', 'US'],
    difficulty: 'beginner',
  },

  {
    slug: 'ipv4-address',
    name: 'IPv4 Address',
    icon: '🌐',
    category: 'validation',
    description: 'Match IPv4 addresses (0.0.0.0 to 255.255.255.255)',
    pattern: '\\b(?:(?:25[0-5]|2[0-4]\\d|[01]?\\d\\d?)\\.){3}(?:25[0-5]|2[0-4]\\d|[01]?\\d\\d?)\\b',
    defaultFlags: 'g',
    sampleTestString:
      'Server at 192.168.1.1 and gateway 10.0.0.1\nPublic DNS: 8.8.8.8, 1.1.1.1\nInvalid: 256.1.1.1, 192.168.1, 999.999.999.999',
    edgeCases: [
      { input: '192.168.1.1', shouldMatch: true, explanation: 'Standard private IP' },
      { input: '255.255.255.255', shouldMatch: true, explanation: 'Max valid IP' },
      { input: '0.0.0.0', shouldMatch: true, explanation: 'Min valid IP' },
      { input: '256.1.1.1', shouldMatch: false, explanation: 'Octet exceeds 255' },
      { input: '192.168.1', shouldMatch: false, explanation: 'Only 3 octets' },
    ],
    codeSnippets: {
      javascript: `const ipv4Regex = /\\b(?:(?:25[0-5]|2[0-4]\\d|[01]?\\d\\d?)\\.){3}(?:25[0-5]|2[0-4]\\d|[01]?\\d\\d?)\\b/g;

function findIPv4(text) {
  return text.match(ipv4Regex) || [];
}`,
      python: `import re

ipv4_pattern = r'\\b(?:(?:25[0-5]|2[0-4]\\d|[01]?\\d\\d?)\\.){3}(?:25[0-5]|2[0-4]\\d|[01]?\\d\\d?)\\b'

def find_ipv4(text: str) -> list[str]:
    return re.findall(ipv4_pattern, text)`,
      go: `package main

import "regexp"

var ipv4Regex = regexp.MustCompile(` + '`\\b(?:(?:25[0-5]|2[0-4]\\d|[01]?\\d\\d?)\\.){3}(?:25[0-5]|2[0-4]\\d|[01]?\\d\\d?)\\b`' + `)

func findIPv4(text string) []string {
    return ipv4Regex.FindAllString(text, -1)
}`,
      php: `<?php
$pattern = '/\\b(?:(?:25[0-5]|2[0-4]\\d|[01]?\\d\\d?)\\.){3}(?:25[0-5]|2[0-4]\\d|[01]?\\d\\d?)\\b/';

function findIPv4(string $text): array {
    preg_match_all($pattern, $text, $matches);
    return $matches[0];
}`,
      java: `import java.util.regex.*;
import java.util.*;

public class IPv4Finder {
    private static final Pattern IPV4 =
        Pattern.compile("\\\\b(?:(?:25[0-5]|2[0-4]\\\\d|[01]?\\\\d\\\\d?)\\\\.){3}(?:25[0-5]|2[0-4]\\\\d|[01]?\\\\d\\\\d?)\\\\b");

    public static List<String> findAll(String text) {
        List<String> results = new ArrayList<>();
        Matcher m = IPV4.matcher(text);
        while (m.find()) results.add(m.group());
        return results;
    }
}`,
    },
    tags: ['ip', 'ipv4', 'address', 'network', 'server'],
    difficulty: 'intermediate',
  },

  {
    slug: 'hex-color',
    name: 'Hex Color Code',
    icon: '🎨',
    category: 'validation',
    description: 'Match CSS hex color codes (#RGB or #RRGGBB)',
    pattern: '#(?:[0-9a-fA-F]{3}){1,2}\\b',
    defaultFlags: 'g',
    sampleTestString:
      'Colors: #FF5733, #fff, #00AAFF, #123abc\nInvalid: #GGG, #12, #1234567, FF5733',
    edgeCases: [
      { input: '#FF5733', shouldMatch: true, explanation: '6-digit hex' },
      { input: '#fff', shouldMatch: true, explanation: '3-digit shorthand' },
      { input: '#00AAFF', shouldMatch: true, explanation: 'Mixed case hex' },
      { input: '#GGG', shouldMatch: false, explanation: 'Invalid hex characters' },
      { input: 'FF5733', shouldMatch: false, explanation: 'Missing hash prefix' },
    ],
    codeSnippets: {
      javascript: `const hexColorRegex = /#(?:[0-9a-fA-F]{3}){1,2}\\b/g;

function findHexColors(text) {
  return text.match(hexColorRegex) || [];
}`,
      python: `import re

hex_pattern = r'#(?:[0-9a-fA-F]{3}){1,2}\\b'

def find_hex_colors(text: str) -> list[str]:
    return re.findall(hex_pattern, text)`,
      go: `package main

import "regexp"

var hexRegex = regexp.MustCompile(` + '`#(?:[0-9a-fA-F]{3}){1,2}\\b`' + `)

func findHexColors(text string) []string {
    return hexRegex.FindAllString(text, -1)
}`,
      php: `<?php
$pattern = '/#(?:[0-9a-fA-F]{3}){1,2}\\b/';

function findHexColors(string $text): array {
    preg_match_all($pattern, $text, $matches);
    return $matches[0];
}`,
      java: `import java.util.regex.*;
import java.util.*;

public class HexColorFinder {
    private static final Pattern HEX = Pattern.compile("#(?:[0-9a-fA-F]{3}){1,2}\\\\b");

    public static List<String> findAll(String text) {
        List<String> r = new ArrayList<>();
        Matcher m = HEX.matcher(text);
        while (m.find()) r.add(m.group());
        return r;
    }
}`,
    },
    tags: ['hex', 'color', 'colour', 'css', 'design', 'rgb'],
    difficulty: 'beginner',
  },

  {
    slug: 'username',
    name: 'Username',
    icon: '👤',
    category: 'validation',
    description: 'Alphanumeric usernames with underscores, 3-16 chars',
    pattern: '^[a-zA-Z0-9_]{3,16}$',
    defaultFlags: '',
    sampleTestString: 'Valid: john_doe, User123, abc\nInvalid: ab, user name, this_is_way_too_long_username!, user@name',
    edgeCases: [
      { input: 'john_doe', shouldMatch: true, explanation: 'Letters and underscore' },
      { input: 'User123', shouldMatch: true, explanation: 'Letters and numbers' },
      { input: 'abc', shouldMatch: true, explanation: 'Minimum 3 characters' },
      { input: 'ab', shouldMatch: false, explanation: 'Too short (under 3)' },
      { input: 'user@name', shouldMatch: false, explanation: 'Special characters not allowed' },
    ],
    codeSnippets: {
      javascript: `const usernameRegex = /^[a-zA-Z0-9_]{3,16}$/;

function isValidUsername(username) {
  return usernameRegex.test(username);
}`,
      python: `import re

username_pattern = r'^[a-zA-Z0-9_]{3,16}$'

def is_valid_username(username: str) -> bool:
    return bool(re.match(username_pattern, username))`,
      go: `package main

import "regexp"

var usernameRegex = regexp.MustCompile(` + '`^[a-zA-Z0-9_]{3,16}$`' + `)

func isValidUsername(u string) bool {
    return usernameRegex.MatchString(u)
}`,
      php: `<?php
function isValidUsername(string $username): bool {
    return preg_match('/^[a-zA-Z0-9_]{3,16}$/', $username) === 1;
}`,
      java: `public class UsernameValidator {
    private static final java.util.regex.Pattern USERNAME =
        java.util.regex.Pattern.compile("^[a-zA-Z0-9_]{3,16}$");

    public static boolean isValid(String username) {
        return USERNAME.matcher(username).matches();
    }
}`,
    },
    tags: ['username', 'user', 'name', 'account', 'login', 'alphanumeric'],
    difficulty: 'beginner',
  },

  {
    slug: 'credit-card',
    name: 'Credit Card Number',
    icon: '💳',
    category: 'validation',
    description: 'Match Visa, MasterCard, and Amex card number formats',
    pattern: '\\b(?:4\\d{3}|5[1-5]\\d{2}|3[47]\\d{2})[\\-\\s]?\\d{4}[\\-\\s]?\\d{4}[\\-\\s]?\\d{1,4}\\b',
    defaultFlags: 'g',
    sampleTestString: 'Visa: 4111-1111-1111-1111\nMC: 5500 0000 0000 0004\nAmex: 3782 822463 10005\nInvalid: 1234-5678-9012-3456, 9999999999999999',
    edgeCases: [
      { input: '4111111111111111', shouldMatch: true, explanation: 'Visa (starts with 4)' },
      { input: '5500-0000-0000-0004', shouldMatch: true, explanation: 'MasterCard with dashes' },
      { input: '3782 822463 10005', shouldMatch: true, explanation: 'Amex format' },
      { input: '1234567890123456', shouldMatch: false, explanation: "Doesn't start with valid prefix" },
    ],
    codeSnippets: {
      javascript: `const ccRegex = /\\b(?:4\\d{3}|5[1-5]\\d{2}|3[47]\\d{2})[\\-\\s]?\\d{4}[\\-\\s]?\\d{4}[\\-\\s]?\\d{1,4}\\b/g;

function findCreditCards(text) {
  return text.match(ccRegex) || [];
}

// ⚠️ Always use Luhn check for real validation`,
      python: `import re

cc_pattern = r'\\b(?:4\\d{3}|5[1-5]\\d{2}|3[47]\\d{2})[\\-\\s]?\\d{4}[\\-\\s]?\\d{4}[\\-\\s]?\\d{1,4}\\b'

def find_credit_cards(text: str) -> list[str]:
    return re.findall(cc_pattern, text)

# ⚠️ Always use Luhn check for real validation`,
      go: `package main

import "regexp"

var ccRegex = regexp.MustCompile(` + '`\\b(?:4\\d{3}|5[1-5]\\d{2}|3[47]\\d{2})[\\-\\s]?\\d{4}[\\-\\s]?\\d{4}[\\-\\s]?\\d{1,4}\\b`' + `)

func findCreditCards(text string) []string {
    return ccRegex.FindAllString(text, -1)
}`,
      php: `<?php
$pattern = '/\\b(?:4\\d{3}|5[1-5]\\d{2}|3[47]\\d{2})[\\-\\s]?\\d{4}[\\-\\s]?\\d{4}[\\-\\s]?\\d{1,4}\\b/';

function findCreditCards(string $text): array {
    preg_match_all($pattern, $text, $matches);
    return $matches[0];
}`,
      java: `import java.util.regex.*;
import java.util.*;

public class CreditCardFinder {
    private static final Pattern CC = Pattern.compile(
        "\\\\b(?:4\\\\d{3}|5[1-5]\\\\d{2}|3[47]\\\\d{2})[\\\\-\\\\s]?\\\\d{4}[\\\\-\\\\s]?\\\\d{4}[\\\\-\\\\s]?\\\\d{1,4}\\\\b");

    public static List<String> findAll(String text) {
        List<String> r = new ArrayList<>();
        Matcher m = CC.matcher(text);
        while (m.find()) r.add(m.group());
        return r;
    }
}`,
    },
    tags: ['credit', 'card', 'visa', 'mastercard', 'amex', 'payment'],
    difficulty: 'intermediate',
  },

  {
    slug: 'uuid',
    name: 'UUID',
    icon: '🔖',
    category: 'validation',
    description: 'Match UUID v4 format (xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx)',
    pattern: '[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-4[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}',
    defaultFlags: 'g',
    sampleTestString: 'Valid: 550e8400-e29b-41d4-a716-446655440000\nAlso: 6ba7b810-9dad-41d1-80b4-00c04fd430c8\nInvalid: not-a-uuid, 550e8400-e29b-51d4-a716-446655440000',
    edgeCases: [
      { input: '550e8400-e29b-41d4-a716-446655440000', shouldMatch: true, explanation: 'Standard UUID v4' },
      { input: '550e8400-e29b-51d4-a716-446655440000', shouldMatch: false, explanation: 'Version 5, not 4' },
    ],
    codeSnippets: {
      javascript: `const uuidRegex = /[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-4[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}/g;

function findUUIDs(text) {
  return text.match(uuidRegex) || [];
}`,
      python: `import re

uuid_pattern = r'[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-4[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}'

def find_uuids(text: str) -> list[str]:
    return re.findall(uuid_pattern, text)`,
      go: `package main

import "regexp"

var uuidRegex = regexp.MustCompile(` + '`[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-4[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}`' + `)

func findUUIDs(text string) []string {
    return uuidRegex.FindAllString(text, -1)
}`,
      php: `<?php
$pattern = '/[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-4[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}/';

function findUUIDs(string $text): array {
    preg_match_all($pattern, $text, $matches);
    return $matches[0];
}`,
      java: `import java.util.regex.*;
import java.util.*;

public class UUIDFinder {
    private static final Pattern UUID_V4 = Pattern.compile(
        "[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-4[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}");

    public static List<String> findAll(String text) {
        List<String> r = new ArrayList<>();
        Matcher m = UUID_V4.matcher(text);
        while (m.find()) r.add(m.group());
        return r;
    }
}`,
    },
    tags: ['uuid', 'guid', 'id', 'identifier', 'unique'],
    difficulty: 'beginner',
  },

  {
    slug: 'semver',
    name: 'Semantic Version',
    icon: '📦',
    category: 'validation',
    description: 'Match semantic versioning (1.2.3, 1.0.0-beta.1)',
    pattern: '\\bv?(?:0|[1-9]\\d*)\\.(?:0|[1-9]\\d*)\\.(?:0|[1-9]\\d*)(?:-[\\da-zA-Z\\-]+(?:\\.[\\da-zA-Z\\-]+)*)?(?:\\+[\\da-zA-Z\\-]+(?:\\.[\\da-zA-Z\\-]+)*)?\\b',
    defaultFlags: 'g',
    sampleTestString: 'v1.2.3, 2.0.0, 1.0.0-alpha, 1.0.0-beta.1+build.123\nInvalid: 1.2, v1, 1.2.3.4',
    edgeCases: [
      { input: '1.2.3', shouldMatch: true, explanation: 'Standard version' },
      { input: 'v2.0.0', shouldMatch: true, explanation: 'With v prefix' },
      { input: '1.0.0-alpha', shouldMatch: true, explanation: 'Pre-release' },
      { input: '1.2', shouldMatch: false, explanation: 'Missing patch version' },
    ],
    codeSnippets: {
      javascript: `const semverRegex = /\\bv?(?:0|[1-9]\\d*)\\.(?:0|[1-9]\\d*)\\.(?:0|[1-9]\\d*)(?:-[\\da-zA-Z\\-]+(?:\\.[\\da-zA-Z\\-]+)*)?(?:\\+[\\da-zA-Z\\-]+(?:\\.[\\da-zA-Z\\-]+)*)?\\b/g;

function findVersions(text) {
  return text.match(semverRegex) || [];
}`,
      python: `import re

semver_pattern = r'\\bv?(?:0|[1-9]\\d*)\\.(?:0|[1-9]\\d*)\\.(?:0|[1-9]\\d*)(?:-[\\da-zA-Z\\-]+(?:\\.[\\da-zA-Z\\-]+)*)?(?:\\+[\\da-zA-Z\\-]+(?:\\.[\\da-zA-Z\\-]+)*)?\\b'

def find_versions(text: str) -> list[str]:
    return re.findall(semver_pattern, text)`,
      go: `package main

import "regexp"

var semverRegex = regexp.MustCompile(` + '`\\bv?(?:0|[1-9]\\d*)\\.(?:0|[1-9]\\d*)\\.(?:0|[1-9]\\d*)(?:-[\\da-zA-Z\\-]+(?:\\.[\\da-zA-Z\\-]+)*)?(?:\\+[\\da-zA-Z\\-]+(?:\\.[\\da-zA-Z\\-]+)*)?\\b`' + `)

func findVersions(text string) []string {
    return semverRegex.FindAllString(text, -1)
}`,
      php: `<?php
$pattern = '/\\bv?(?:0|[1-9]\\d*)\\.(?:0|[1-9]\\d*)\\.(?:0|[1-9]\\d*)(?:-[\\da-zA-Z\\-]+(?:\\.[\\da-zA-Z\\-]+)*)?(?:\\+[\\da-zA-Z\\-]+(?:\\.[\\da-zA-Z\\-]+)*)?\\b/';

function findVersions(string $text): array {
    preg_match_all($pattern, $text, $matches);
    return $matches[0];
}`,
      java: `import java.util.regex.*;
import java.util.*;

public class SemverFinder {
    private static final Pattern SEMVER = Pattern.compile(
        "\\\\bv?(?:0|[1-9]\\\\d*)\\\\.(?:0|[1-9]\\\\d*)\\\\.(?:0|[1-9]\\\\d*)(?:-[\\\\da-zA-Z\\\\-]+(?:\\\\.[\\\\da-zA-Z\\\\-]+)*)?(?:\\\\+[\\\\da-zA-Z\\\\-]+(?:\\\\.[\\\\da-zA-Z\\\\-]+)*)?\\\\b");

    public static List<String> findAll(String text) {
        List<String> r = new ArrayList<>();
        Matcher m = SEMVER.matcher(text);
        while (m.find()) r.add(m.group());
        return r;
    }
}`,
    },
    tags: ['version', 'semver', 'semantic', 'release', 'package'],
    difficulty: 'intermediate',
  },

  {
    slug: 'mac-address',
    name: 'MAC Address',
    icon: '🖥️',
    category: 'validation',
    description: 'Match MAC addresses (colon or hyphen separated)',
    pattern: '(?:[0-9a-fA-F]{2}[:\\-]){5}[0-9a-fA-F]{2}',
    defaultFlags: 'g',
    sampleTestString: 'Device: 00:1A:2B:3C:4D:5E and 00-1A-2B-3C-4D-5E\nInvalid: 00:1A:2B:3C:4D, ZZ:ZZ:ZZ:ZZ:ZZ:ZZ',
    edgeCases: [
      { input: '00:1A:2B:3C:4D:5E', shouldMatch: true, explanation: 'Colon-separated' },
      { input: '00-1A-2B-3C-4D-5E', shouldMatch: true, explanation: 'Hyphen-separated' },
      { input: '00:1A:2B:3C:4D', shouldMatch: false, explanation: 'Only 5 groups' },
    ],
    codeSnippets: {
      javascript: `const macRegex = /(?:[0-9a-fA-F]{2}[:\\-]){5}[0-9a-fA-F]{2}/g;

function findMacAddresses(text) {
  return text.match(macRegex) || [];
}`,
      python: `import re

mac_pattern = r'(?:[0-9a-fA-F]{2}[:\\-]){5}[0-9a-fA-F]{2}'

def find_mac_addresses(text: str) -> list[str]:
    return re.findall(mac_pattern, text)`,
      go: `package main

import "regexp"

var macRegex = regexp.MustCompile(` + '`(?:[0-9a-fA-F]{2}[:\\-]){5}[0-9a-fA-F]{2}`' + `)

func findMACs(text string) []string {
    return macRegex.FindAllString(text, -1)
}`,
      php: `<?php
$pattern = '/(?:[0-9a-fA-F]{2}[:\\-]){5}[0-9a-fA-F]{2}/';

function findMacAddresses(string $text): array {
    preg_match_all($pattern, $text, $matches);
    return $matches[0];
}`,
      java: `import java.util.regex.*;
import java.util.*;

public class MACFinder {
    private static final Pattern MAC = Pattern.compile("(?:[0-9a-fA-F]{2}[:\\\\-]){5}[0-9a-fA-F]{2}");

    public static List<String> findAll(String text) {
        List<String> r = new ArrayList<>();
        Matcher m = MAC.matcher(text);
        while (m.find()) r.add(m.group());
        return r;
    }
}`,
    },
    tags: ['mac', 'address', 'network', 'hardware', 'ethernet'],
    difficulty: 'beginner',
  },

  {
    slug: 'slug-url',
    name: 'URL Slug',
    icon: '🔤',
    category: 'validation',
    description: 'Match URL-friendly slugs (lowercase, hyphens, no spaces)',
    pattern: '^[a-z0-9]+(?:-[a-z0-9]+)*$',
    defaultFlags: '',
    sampleTestString: 'Valid: my-blog-post, hello-world-123, single\nInvalid: My-Post, has spaces, -leading, trailing-, has--double',
    edgeCases: [
      { input: 'my-blog-post', shouldMatch: true, explanation: 'Standard slug' },
      { input: 'single', shouldMatch: true, explanation: 'No hyphens needed' },
      { input: 'My-Post', shouldMatch: false, explanation: 'Uppercase not allowed' },
      { input: '-leading', shouldMatch: false, explanation: 'Cannot start with hyphen' },
    ],
    codeSnippets: {
      javascript: `const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

function isValidSlug(slug) {
  return slugRegex.test(slug);
}`,
      python: `import re

slug_pattern = r'^[a-z0-9]+(?:-[a-z0-9]+)*$'

def is_valid_slug(slug: str) -> bool:
    return bool(re.match(slug_pattern, slug))`,
      go: `package main

import "regexp"

var slugRegex = regexp.MustCompile(` + '`^[a-z0-9]+(?:-[a-z0-9]+)*$`' + `)

func isValidSlug(s string) bool {
    return slugRegex.MatchString(s)
}`,
      php: `<?php
function isValidSlug(string $slug): bool {
    return preg_match('/^[a-z0-9]+(?:-[a-z0-9]+)*$/', $slug) === 1;
}`,
      java: `public class SlugValidator {
    private static final java.util.regex.Pattern SLUG =
        java.util.regex.Pattern.compile("^[a-z0-9]+(?:-[a-z0-9]+)*$");

    public static boolean isValid(String slug) {
        return SLUG.matcher(slug).matches();
    }
}`,
    },
    tags: ['slug', 'url', 'seo', 'permalink', 'friendly'],
    difficulty: 'beginner',
  },

  // ═══════════════════════════════════════════════════
  // SECURITY
  // ═══════════════════════════════════════════════════
  {
    slug: 'password-strength',
    name: 'Password Strength',
    icon: '🔑',
    category: 'security',
    description: 'Validate: uppercase, lowercase, number, special char, 8+ length',
    pattern: '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&#])[A-Za-z\\d@$!%*?&#]{8,}$',
    defaultFlags: '',
    sampleTestString: 'Strong: MyP@ssw0rd, Secur3!Pass\nWeak: password, Password1, short, P@1a',
    edgeCases: [
      { input: 'MyP@ssw0rd', shouldMatch: true, explanation: 'Meets all criteria' },
      { input: 'Secur3!Pass', shouldMatch: true, explanation: 'All requirements met' },
      { input: 'password', shouldMatch: false, explanation: 'No uppercase, digit, or special' },
      { input: 'Password1', shouldMatch: false, explanation: 'No special character' },
      { input: 'P@1a', shouldMatch: false, explanation: 'Too short (under 8)' },
    ],
    codeSnippets: {
      javascript: `const strongPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&#])[A-Za-z\\d@$!%*?&#]{8,}$/;

function isStrongPassword(password) {
  return strongPassword.test(password);
}`,
      python: `import re

password_pattern = r'^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&#])[A-Za-z\\d@$!%*?&#]{8,}$'

def is_strong_password(password: str) -> bool:
    return bool(re.match(password_pattern, password))`,
      go: `package main

import "regexp"

var passwordRegex = regexp.MustCompile(` + '`^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&#])[A-Za-z\\d@$!%*?&#]{8,}$`' + `)

func isStrongPassword(p string) bool {
    return passwordRegex.MatchString(p)
}`,
      php: `<?php
function isStrongPassword(string $password): bool {
    $pattern = '/^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&#])[A-Za-z\\d@$!%*?&#]{8,}$/';
    return preg_match($pattern, $password) === 1;
}`,
      java: `public class PasswordValidator {
    private static final java.util.regex.Pattern STRONG = java.util.regex.Pattern.compile(
        "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\\\d)(?=.*[@$!%*?&#])[A-Za-z\\\\d@$!%*?&#]{8,}$");

    public static boolean isStrong(String password) {
        return STRONG.matcher(password).matches();
    }
}`,
    },
    tags: ['password', 'security', 'validate', 'strength', 'auth', 'login'],
    difficulty: 'intermediate',
  },

  {
    slug: 'jwt-token',
    name: 'JWT Token',
    icon: '🪙',
    category: 'security',
    description: 'Match JSON Web Token format (header.payload.signature)',
    pattern: 'eyJ[A-Za-z0-9\\-_]+\\.eyJ[A-Za-z0-9\\-_]+\\.[A-Za-z0-9\\-_]+',
    defaultFlags: 'g',
    sampleTestString: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMjM0NTY3ODkwIn0.dozjgNryP4J3jVmNHl0w5N_XgL0n3I9PlFUP0THsR8U\nInvalid: not.a.jwt, eyJhbG.short',
    edgeCases: [
      { input: 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMjM0NTY3ODkwIn0.dozjgNryP4J3jVmNHl0w5N_XgL0n3I9PlFUP0THsR8U', shouldMatch: true, explanation: 'Standard JWT' },
      { input: 'not.a.jwt', shouldMatch: false, explanation: "Doesn't start with eyJ" },
    ],
    codeSnippets: {
      javascript: `const jwtRegex = /eyJ[A-Za-z0-9\\-_]+\\.eyJ[A-Za-z0-9\\-_]+\\.[A-Za-z0-9\\-_]+/g;

function findJWTs(text) {
  return text.match(jwtRegex) || [];
}`,
      python: `import re

jwt_pattern = r'eyJ[A-Za-z0-9\\-_]+\\.eyJ[A-Za-z0-9\\-_]+\\.[A-Za-z0-9\\-_]+'

def find_jwts(text: str) -> list[str]:
    return re.findall(jwt_pattern, text)`,
      go: `package main

import "regexp"

var jwtRegex = regexp.MustCompile(` + '`eyJ[A-Za-z0-9\\-_]+\\.eyJ[A-Za-z0-9\\-_]+\\.[A-Za-z0-9\\-_]+`' + `)

func findJWTs(text string) []string {
    return jwtRegex.FindAllString(text, -1)
}`,
      php: `<?php
$pattern = '/eyJ[A-Za-z0-9\\-_]+\\.eyJ[A-Za-z0-9\\-_]+\\.[A-Za-z0-9\\-_]+/';

function findJWTs(string $text): array {
    preg_match_all($pattern, $text, $matches);
    return $matches[0];
}`,
      java: `import java.util.regex.*;
import java.util.*;

public class JWTFinder {
    private static final Pattern JWT = Pattern.compile(
        "eyJ[A-Za-z0-9\\\\-_]+\\\\.eyJ[A-Za-z0-9\\\\-_]+\\\\.[A-Za-z0-9\\\\-_]+");

    public static List<String> findAll(String text) {
        List<String> r = new ArrayList<>();
        Matcher m = JWT.matcher(text);
        while (m.find()) r.add(m.group());
        return r;
    }
}`,
    },
    tags: ['jwt', 'token', 'auth', 'bearer', 'security', 'api'],
    difficulty: 'intermediate',
  },

  // ═══════════════════════════════════════════════════
  // EXTRACTION
  // ═══════════════════════════════════════════════════
  {
    slug: 'extract-numbers',
    name: 'Extract Numbers',
    icon: '🔢',
    category: 'extraction',
    description: 'Extract integers and decimal numbers from text',
    pattern: '-?\\d+\\.?\\d*',
    defaultFlags: 'g',
    sampleTestString: 'The temperature is -5.5°C, rising to 23 by noon.\nStock price: 142.50, volume: 1000000\nNo numbers here!',
    edgeCases: [
      { input: '42', shouldMatch: true, explanation: 'Integer' },
      { input: '-5.5', shouldMatch: true, explanation: 'Negative decimal' },
      { input: '3.14', shouldMatch: true, explanation: 'Decimal' },
      { input: 'abc', shouldMatch: false, explanation: 'No numbers' },
    ],
    codeSnippets: {
      javascript: `const numberRegex = /-?\\d+\\.?\\d*/g;

function extractNumbers(text) {
  return (text.match(numberRegex) || []).map(Number);
}`,
      python: `import re

number_pattern = r'-?\\d+\\.?\\d*'

def extract_numbers(text: str) -> list[float]:
    return [float(n) for n in re.findall(number_pattern, text)]`,
      go: `package main

import "regexp"

var numberRegex = regexp.MustCompile(` + '`-?\\d+\\.?\\d*`' + `)

func extractNumbers(text string) []string {
    return numberRegex.FindAllString(text, -1)
}`,
      php: `<?php
function extractNumbers(string $text): array {
    preg_match_all('/-?\\d+\\.?\\d*/', $text, $matches);
    return array_map('floatval', $matches[0]);
}`,
      java: `import java.util.regex.*;
import java.util.*;

public class NumberExtractor {
    private static final Pattern NUM = Pattern.compile("-?\\\\d+\\\\.?\\\\d*");

    public static List<Double> extract(String text) {
        List<Double> r = new ArrayList<>();
        Matcher m = NUM.matcher(text);
        while (m.find()) r.add(Double.parseDouble(m.group()));
        return r;
    }
}`,
    },
    tags: ['number', 'integer', 'decimal', 'float', 'extract', 'digit'],
    difficulty: 'beginner',
  },

  {
    slug: 'extract-hashtags',
    name: 'Hashtags',
    icon: '#️⃣',
    category: 'extraction',
    description: 'Extract #hashtags from social media text',
    pattern: '#[a-zA-Z][a-zA-Z0-9_]*',
    defaultFlags: 'g',
    sampleTestString: 'Loving the #sunset today! #Photography #nature_pics\nNot a hashtag: # alone, #123start\nAlso #CamelCase and #a',
    edgeCases: [
      { input: '#sunset', shouldMatch: true, explanation: 'Simple hashtag' },
      { input: '#CamelCase', shouldMatch: true, explanation: 'Mixed case' },
      { input: '#nature_pics', shouldMatch: true, explanation: 'Underscore allowed' },
      { input: '#', shouldMatch: false, explanation: 'Hash alone' },
      { input: '#123', shouldMatch: false, explanation: 'Must start with letter' },
    ],
    codeSnippets: {
      javascript: `const hashtagRegex = /#[a-zA-Z][a-zA-Z0-9_]*/g;

function extractHashtags(text) {
  return text.match(hashtagRegex) || [];
}`,
      python: `import re

hashtag_pattern = r'#[a-zA-Z][a-zA-Z0-9_]*'

def extract_hashtags(text: str) -> list[str]:
    return re.findall(hashtag_pattern, text)`,
      go: `package main

import "regexp"

var hashtagRegex = regexp.MustCompile(` + '`#[a-zA-Z][a-zA-Z0-9_]*`' + `)

func extractHashtags(text string) []string {
    return hashtagRegex.FindAllString(text, -1)
}`,
      php: `<?php
function extractHashtags(string $text): array {
    preg_match_all('/#[a-zA-Z][a-zA-Z0-9_]*/', $text, $matches);
    return $matches[0];
}`,
      java: `import java.util.regex.*;
import java.util.*;

public class HashtagExtractor {
    private static final Pattern HASHTAG = Pattern.compile("#[a-zA-Z][a-zA-Z0-9_]*");

    public static List<String> extract(String text) {
        List<String> r = new ArrayList<>();
        Matcher m = HASHTAG.matcher(text);
        while (m.find()) r.add(m.group());
        return r;
    }
}`,
    },
    tags: ['hashtag', 'social', 'twitter', 'instagram', 'tag', 'extract'],
    difficulty: 'beginner',
  },

  {
    slug: 'extract-mentions',
    name: '@Mentions',
    icon: '📣',
    category: 'extraction',
    description: 'Extract @mentions from social media text',
    pattern: '@[a-zA-Z][a-zA-Z0-9_]{0,14}',
    defaultFlags: 'g',
    sampleTestString: 'Hey @john_doe check this out! CC: @JaneSmith @dev123\nNot: @ alone, @123user\nEmail not caught: user@domain.com',
    edgeCases: [
      { input: '@john_doe', shouldMatch: true, explanation: 'Standard mention' },
      { input: '@JaneSmith', shouldMatch: true, explanation: 'CamelCase handle' },
      { input: '@', shouldMatch: false, explanation: 'At sign alone' },
    ],
    codeSnippets: {
      javascript: `const mentionRegex = /@[a-zA-Z][a-zA-Z0-9_]{0,14}/g;

function extractMentions(text) {
  return text.match(mentionRegex) || [];
}`,
      python: `import re

mention_pattern = r'@[a-zA-Z][a-zA-Z0-9_]{0,14}'

def extract_mentions(text: str) -> list[str]:
    return re.findall(mention_pattern, text)`,
      go: `package main

import "regexp"

var mentionRegex = regexp.MustCompile(` + '`@[a-zA-Z][a-zA-Z0-9_]{0,14}`' + `)

func extractMentions(text string) []string {
    return mentionRegex.FindAllString(text, -1)
}`,
      php: `<?php
function extractMentions(string $text): array {
    preg_match_all('/@[a-zA-Z][a-zA-Z0-9_]{0,14}/', $text, $matches);
    return $matches[0];
}`,
      java: `import java.util.regex.*;
import java.util.*;

public class MentionExtractor {
    private static final Pattern MENTION = Pattern.compile("@[a-zA-Z][a-zA-Z0-9_]{0,14}");

    public static List<String> extract(String text) {
        List<String> r = new ArrayList<>();
        Matcher m = MENTION.matcher(text);
        while (m.find()) r.add(m.group());
        return r;
    }
}`,
    },
    tags: ['mention', 'at', 'social', 'twitter', 'user', 'handle', 'extract'],
    difficulty: 'beginner',
  },

  {
    slug: 'extract-between-quotes',
    name: 'Text Between Quotes',
    icon: '💬',
    category: 'extraction',
    description: 'Extract text wrapped in double or single quotes',
    pattern: '(["\'])(?:(?!\\1).)*\\1',
    defaultFlags: 'g',
    sampleTestString: 'She said "hello world" and \'goodbye\'\nHe replied "it\'s fine" and left.\nEmpty: "" and \'\'',
    edgeCases: [
      { input: '"hello world"', shouldMatch: true, explanation: 'Double-quoted text' },
      { input: "'goodbye'", shouldMatch: true, explanation: 'Single-quoted text' },
      { input: '""', shouldMatch: true, explanation: 'Empty double quotes' },
      { input: 'no quotes', shouldMatch: false, explanation: 'No quotes present' },
    ],
    codeSnippets: {
      javascript: `const quotedRegex = /(['"])(?:(?!\\1).)*\\1/g;

function extractQuoted(text) {
  return (text.match(quotedRegex) || [])
    .map(s => s.slice(1, -1)); // Remove quotes
}`,
      python: `import re

quoted_pattern = r'(["\\''])(?:(?!\\1).)*\\1'

def extract_quoted(text: str) -> list[str]:
    return [m.group()[1:-1] for m in re.finditer(quoted_pattern, text)]`,
      go: `package main

import "regexp"

var quotedRegex = regexp.MustCompile(` + "`" + `(["'])(?:(?:(?!\\1).)*)\\1` + "`" + `)

func extractQuoted(text string) []string {
    matches := quotedRegex.FindAllString(text, -1)
    results := make([]string, len(matches))
    for i, m := range matches {
        results[i] = m[1 : len(m)-1]
    }
    return results
}`,
      php: `<?php
function extractQuoted(string $text): array {
    preg_match_all('/(["\\'\\'])(?:(?!\\1).)*\\1/', $text, $matches);
    return array_map(fn($m) => substr($m, 1, -1), $matches[0]);
}`,
      java: `import java.util.regex.*;
import java.util.*;

public class QuotedExtractor {
    private static final Pattern QUOTED = Pattern.compile("([\"'])(?:(?!\\\\1).)*\\\\1");

    public static List<String> extract(String text) {
        List<String> r = new ArrayList<>();
        Matcher m = QUOTED.matcher(text);
        while (m.find()) {
            String s = m.group();
            r.add(s.substring(1, s.length() - 1));
        }
        return r;
    }
}`,
    },
    tags: ['quote', 'quoted', 'string', 'extract', 'text', 'double', 'single'],
    difficulty: 'intermediate',
  },

  {
    slug: 'extract-html-tags',
    name: 'HTML Tags',
    icon: '🏷️',
    category: 'extraction',
    description: 'Extract HTML/XML tags and their names',
    pattern: '<\\/?([a-zA-Z][a-zA-Z0-9]*)\\b[^>]*>',
    defaultFlags: 'g',
    sampleTestString: '<div class="container">\n  <p>Hello <strong>world</strong></p>\n  <img src="photo.jpg" />\n  <br>\n</div>\nNot tags: < text >, 5 > 3',
    edgeCases: [
      { input: '<div>', shouldMatch: true, explanation: 'Simple opening tag' },
      { input: '</div>', shouldMatch: true, explanation: 'Closing tag' },
      { input: '<img src="x" />', shouldMatch: true, explanation: 'Self-closing with attributes' },
      { input: '< text >', shouldMatch: false, explanation: 'Not a valid tag' },
    ],
    codeSnippets: {
      javascript: `const htmlTagRegex = /<\\/?([a-zA-Z][a-zA-Z0-9]*)\\b[^>]*>/g;

function findHtmlTags(text) {
  return text.match(htmlTagRegex) || [];
}

// ⚠️ For real HTML parsing, use DOMParser`,
      python: `import re

html_tag_pattern = r'</?([a-zA-Z][a-zA-Z0-9]*)\\b[^>]*>'

def find_html_tags(text: str) -> list[str]:
    return re.findall(html_tag_pattern, text)

# ⚠️ For real HTML parsing, use BeautifulSoup`,
      go: `package main

import "regexp"

var htmlTagRegex = regexp.MustCompile(` + "`" + `</?([a-zA-Z][a-zA-Z0-9]*)\b[^>]*>` + "`" + `)

func findHTMLTags(text string) []string {
    return htmlTagRegex.FindAllString(text, -1)
}`,
      php: `<?php
function findHtmlTags(string $text): array {
    preg_match_all('/<\\/?([a-zA-Z][a-zA-Z0-9]*)\\b[^>]*>/', $text, $matches);
    return $matches[0];
}`,
      java: `import java.util.regex.*;
import java.util.*;

public class HtmlTagFinder {
    private static final Pattern TAG = Pattern.compile("</?([a-zA-Z][a-zA-Z0-9]*)\\\\b[^>]*>");

    public static List<String> findAll(String text) {
        List<String> r = new ArrayList<>();
        Matcher m = TAG.matcher(text);
        while (m.find()) r.add(m.group());
        return r;
    }
}`,
    },
    tags: ['html', 'xml', 'tag', 'markup', 'element', 'extract'],
    difficulty: 'intermediate',
  },

  {
    slug: 'extract-domain',
    name: 'Domain from URL',
    icon: '🌍',
    category: 'extraction',
    description: 'Extract the domain name from URLs',
    pattern: 'https?:\\/\\/(?:www\\.)?([^\\/:]+)',
    defaultFlags: 'g',
    sampleTestString: 'Visit https://www.example.com/path and http://api.github.com/repos\nAlso https://localhost:3000/dev',
    edgeCases: [
      { input: 'https://www.example.com/path', shouldMatch: true, explanation: 'Extracts example.com' },
      { input: 'http://api.github.com', shouldMatch: true, explanation: 'Subdomain included' },
      { input: 'ftp://files.com', shouldMatch: false, explanation: 'FTP not matched' },
    ],
    codeSnippets: {
      javascript: `const domainRegex = /https?:\\/\\/(?:www\\.)?([^\\/:]+)/g;

function extractDomains(text) {
  const results = [];
  let match;
  while ((match = domainRegex.exec(text)) !== null) {
    results.push(match[1]);
  }
  return results;
}`,
      python: `import re

domain_pattern = r'https?://(?:www\\.)?([^/:]+)'

def extract_domains(text: str) -> list[str]:
    return re.findall(domain_pattern, text)`,
      go: `package main

import "regexp"

var domainRegex = regexp.MustCompile(` + "`" + `https?://(?:www\\.)?([^/:]+)` + "`" + `)

func extractDomains(text string) []string {
    matches := domainRegex.FindAllStringSubmatch(text, -1)
    results := make([]string, len(matches))
    for i, m := range matches {
        results[i] = m[1]
    }
    return results
}`,
      php: `<?php
function extractDomains(string $text): array {
    preg_match_all('/https?:\\/\\/(?:www\\.)?([^\\/:]+)/', $text, $matches);
    return $matches[1];
}`,
      java: `import java.util.regex.*;
import java.util.*;

public class DomainExtractor {
    private static final Pattern DOMAIN = Pattern.compile("https?://(?:www\\\\.)?([^/:]+)");

    public static List<String> extract(String text) {
        List<String> r = new ArrayList<>();
        Matcher m = DOMAIN.matcher(text);
        while (m.find()) r.add(m.group(1));
        return r;
    }
}`,
    },
    tags: ['domain', 'url', 'host', 'website', 'extract'],
    difficulty: 'intermediate',
  },

  {
    slug: 'extract-file-extension',
    name: 'File Extension',
    icon: '📄',
    category: 'extraction',
    description: 'Extract file extensions from file names and paths',
    pattern: '\\.[a-zA-Z0-9]{1,10}$',
    defaultFlags: 'gm',
    sampleTestString: 'document.pdf\nphoto.jpg\narchive.tar.gz\nscript.min.js\nno-extension\n.hidden',
    edgeCases: [
      { input: 'file.pdf', shouldMatch: true, explanation: 'Simple extension' },
      { input: 'image.jpeg', shouldMatch: true, explanation: '4-letter extension' },
      { input: 'noext', shouldMatch: false, explanation: 'No extension' },
    ],
    codeSnippets: {
      javascript: `const extRegex = /\\.[a-zA-Z0-9]{1,10}$/;

function getExtension(filename) {
  const match = filename.match(extRegex);
  return match ? match[0] : null;
}`,
      python: `import re

ext_pattern = r'\\.[a-zA-Z0-9]{1,10}$'

def get_extension(filename: str) -> str | None:
    match = re.search(ext_pattern, filename)
    return match.group() if match else None`,
      go: `package main

import "regexp"

var extRegex = regexp.MustCompile(` + '`\\.[a-zA-Z0-9]{1,10}$`' + `)

func getExtension(filename string) string {
    return extRegex.FindString(filename)
}`,
      php: `<?php
function getExtension(string $filename): ?string {
    if (preg_match('/\\.[a-zA-Z0-9]{1,10}$/', $filename, $m)) {
        return $m[0];
    }
    return null;
}`,
      java: `import java.util.regex.*;

public class ExtensionExtractor {
    private static final Pattern EXT = Pattern.compile("\\\\.[a-zA-Z0-9]{1,10}$");

    public static String getExtension(String filename) {
        Matcher m = EXT.matcher(filename);
        return m.find() ? m.group() : null;
    }
}`,
    },
    tags: ['file', 'extension', 'ext', 'filename', 'path', 'extract'],
    difficulty: 'beginner',
  },

  {
    slug: 'extract-price',
    name: 'Price / Currency',
    icon: '💰',
    category: 'extraction',
    description: 'Extract price values with currency symbols ($, €, £)',
    pattern: '[$€£]\\s?\\d{1,3}(?:,\\d{3})*(?:\\.\\d{2})?',
    defaultFlags: 'g',
    sampleTestString: 'iPhone costs $999.99 in the US\nIn Europe: €849.00, UK price: £799\nBulk: $1,299.99 and $12,500\nNot prices: 100, $, €abc',
    edgeCases: [
      { input: '$999.99', shouldMatch: true, explanation: 'USD with cents' },
      { input: '€849.00', shouldMatch: true, explanation: 'Euro amount' },
      { input: '£799', shouldMatch: true, explanation: 'GBP without cents' },
      { input: '$1,299.99', shouldMatch: true, explanation: 'With comma separator' },
      { input: '100', shouldMatch: false, explanation: 'No currency symbol' },
    ],
    codeSnippets: {
      javascript: `const priceRegex = /[$€£]\\s?\\d{1,3}(?:,\\d{3})*(?:\\.\\d{2})?/g;

function extractPrices(text) {
  return text.match(priceRegex) || [];
}`,
      python: `import re

price_pattern = r'[$€£]\\s?\\d{1,3}(?:,\\d{3})*(?:\\.\\d{2})?'

def extract_prices(text: str) -> list[str]:
    return re.findall(price_pattern, text)`,
      go: `package main

import "regexp"

var priceRegex = regexp.MustCompile(` + "`" + `[$€£]\s?\d{1,3}(?:,\d{3})*(?:\.\d{2})?` + "`" + `)

func extractPrices(text string) []string {
    return priceRegex.FindAllString(text, -1)
}`,
      php: `<?php
function extractPrices(string $text): array {
    preg_match_all('/[$€£]\\s?\\d{1,3}(?:,\\d{3})*(?:\\.\\d{2})?/', $text, $matches);
    return $matches[0];
}`,
      java: `import java.util.regex.*;
import java.util.*;

public class PriceExtractor {
    private static final Pattern PRICE = Pattern.compile("[$€£]\\\\s?\\\\d{1,3}(?:,\\\\d{3})*(?:\\\\.\\\\d{2})?");

    public static List<String> extract(String text) {
        List<String> r = new ArrayList<>();
        Matcher m = PRICE.matcher(text);
        while (m.find()) r.add(m.group());
        return r;
    }
}`,
    },
    tags: ['price', 'currency', 'money', 'dollar', 'euro', 'pound', 'extract', 'cost'],
    difficulty: 'intermediate',
  },

  // ═══════════════════════════════════════════════════
  // FORMATTING
  // ═══════════════════════════════════════════════════
  {
    slug: 'date-iso',
    name: 'Date (YYYY-MM-DD)',
    icon: '📅',
    category: 'formatting',
    description: 'Match ISO 8601 date format',
    pattern: '\\d{4}-(?:0[1-9]|1[0-2])-(?:0[1-9]|[12]\\d|3[01])',
    defaultFlags: 'g',
    sampleTestString: 'Created on 2024-01-15, updated 2023-12-31\nInvalid: 2024-13-01, 2024-00-15, 2024-1-5',
    edgeCases: [
      { input: '2024-01-15', shouldMatch: true, explanation: 'Standard ISO date' },
      { input: '2023-12-31', shouldMatch: true, explanation: 'Year-end date' },
      { input: '2024-13-01', shouldMatch: false, explanation: 'Month 13 invalid' },
      { input: '2024-1-5', shouldMatch: false, explanation: 'Not zero-padded' },
    ],
    codeSnippets: {
      javascript: `const isoDateRegex = /\\d{4}-(?:0[1-9]|1[0-2])-(?:0[1-9]|[12]\\d|3[01])/g;

function findDates(text) {
  return text.match(isoDateRegex) || [];
}`,
      python: `import re

iso_date_pattern = r'\\d{4}-(?:0[1-9]|1[0-2])-(?:0[1-9]|[12]\\d|3[01])'

def find_dates(text: str) -> list[str]:
    return re.findall(iso_date_pattern, text)`,
      go: `package main

import "regexp"

var isoDateRegex = regexp.MustCompile(` + '`\\d{4}-(?:0[1-9]|1[0-2])-(?:0[1-9]|[12]\\d|3[01])`' + `)

func findDates(text string) []string {
    return isoDateRegex.FindAllString(text, -1)
}`,
      php: `<?php
function findDates(string $text): array {
    preg_match_all('/\\d{4}-(?:0[1-9]|1[0-2])-(?:0[1-9]|[12]\\d|3[01])/', $text, $matches);
    return $matches[0];
}`,
      java: `import java.util.regex.*;
import java.util.*;

public class DateFinder {
    private static final Pattern ISO_DATE = Pattern.compile(
        "\\\\d{4}-(?:0[1-9]|1[0-2])-(?:0[1-9]|[12]\\\\d|3[01])");

    public static List<String> findAll(String text) {
        List<String> r = new ArrayList<>();
        Matcher m = ISO_DATE.matcher(text);
        while (m.find()) r.add(m.group());
        return r;
    }
}`,
    },
    tags: ['date', 'iso', 'yyyy', 'time', 'calendar', 'format'],
    difficulty: 'beginner',
  },

  {
    slug: 'date-us',
    name: 'Date (MM/DD/YYYY)',
    icon: '🗓️',
    category: 'formatting',
    description: 'Match US date format with slashes',
    pattern: '(?:0[1-9]|1[0-2])\\/(?:0[1-9]|[12]\\d|3[01])\\/\\d{4}',
    defaultFlags: 'g',
    sampleTestString: 'Born on 01/15/1990, expires 12/31/2025\nInvalid: 13/01/2024, 1/5/2024, 00/15/2024',
    edgeCases: [
      { input: '01/15/1990', shouldMatch: true, explanation: 'Standard US date' },
      { input: '12/31/2025', shouldMatch: true, explanation: 'Year-end date' },
      { input: '13/01/2024', shouldMatch: false, explanation: 'Month 13 invalid' },
      { input: '1/5/2024', shouldMatch: false, explanation: 'Not zero-padded' },
    ],
    codeSnippets: {
      javascript: `const usDateRegex = /(?:0[1-9]|1[0-2])\\/(?:0[1-9]|[12]\\d|3[01])\\/\\d{4}/g;

function findUSDates(text) {
  return text.match(usDateRegex) || [];
}`,
      python: `import re

us_date_pattern = r'(?:0[1-9]|1[0-2])/(?:0[1-9]|[12]\\d|3[01])/\\d{4}'

def find_us_dates(text: str) -> list[str]:
    return re.findall(us_date_pattern, text)`,
      go: `package main

import "regexp"

var usDateRegex = regexp.MustCompile(` + "`" + `(?:0[1-9]|1[0-2])/(?:0[1-9]|[12]\d|3[01])/\d{4}` + "`" + `)

func findUSDates(text string) []string {
    return usDateRegex.FindAllString(text, -1)
}`,
      php: `<?php
function findUSDates(string $text): array {
    preg_match_all('/(?:0[1-9]|1[0-2])\\/(?:0[1-9]|[12]\\d|3[01])\\/\\d{4}/', $text, $matches);
    return $matches[0];
}`,
      java: `import java.util.regex.*;
import java.util.*;

public class USDateFinder {
    private static final Pattern US_DATE = Pattern.compile(
        "(?:0[1-9]|1[0-2])/(?:0[1-9]|[12]\\\\d|3[01])/\\\\d{4}");

    public static List<String> findAll(String text) {
        List<String> r = new ArrayList<>();
        Matcher m = US_DATE.matcher(text);
        while (m.find()) r.add(m.group());
        return r;
    }
}`,
    },
    tags: ['date', 'us', 'american', 'slash', 'format', 'mm/dd/yyyy'],
    difficulty: 'beginner',
  },

  {
    slug: 'time-24h',
    name: 'Time (24-hour)',
    icon: '🕐',
    category: 'formatting',
    description: 'Match 24-hour time format (HH:MM or HH:MM:SS)',
    pattern: '(?:[01]\\d|2[0-3]):[0-5]\\d(?::[0-5]\\d)?',
    defaultFlags: 'g',
    sampleTestString: 'Meeting at 09:30, lunch at 12:00, log entry 23:59:59\nInvalid: 25:00, 12:60, 9:30',
    edgeCases: [
      { input: '09:30', shouldMatch: true, explanation: 'Morning time' },
      { input: '23:59:59', shouldMatch: true, explanation: 'With seconds' },
      { input: '00:00', shouldMatch: true, explanation: 'Midnight' },
      { input: '25:00', shouldMatch: false, explanation: 'Hour exceeds 23' },
      { input: '12:60', shouldMatch: false, explanation: 'Minutes exceed 59' },
    ],
    codeSnippets: {
      javascript: `const time24Regex = /(?:[01]\\d|2[0-3]):[0-5]\\d(?::[0-5]\\d)?/g;

function findTimes(text) {
  return text.match(time24Regex) || [];
}`,
      python: `import re

time24_pattern = r'(?:[01]\\d|2[0-3]):[0-5]\\d(?::[0-5]\\d)?'

def find_times(text: str) -> list[str]:
    return re.findall(time24_pattern, text)`,
      go: `package main

import "regexp"

var time24Regex = regexp.MustCompile(` + '`(?:[01]\\d|2[0-3]):[0-5]\\d(?::[0-5]\\d)?`' + `)

func findTimes(text string) []string {
    return time24Regex.FindAllString(text, -1)
}`,
      php: `<?php
function findTimes(string $text): array {
    preg_match_all('/(?:[01]\\d|2[0-3]):[0-5]\\d(?::[0-5]\\d)?/', $text, $matches);
    return $matches[0];
}`,
      java: `import java.util.regex.*;
import java.util.*;

public class TimeFinder {
    private static final Pattern TIME = Pattern.compile("(?:[01]\\\\d|2[0-3]):[0-5]\\\\d(?::[0-5]\\\\d)?");

    public static List<String> findAll(String text) {
        List<String> r = new ArrayList<>();
        Matcher m = TIME.matcher(text);
        while (m.find()) r.add(m.group());
        return r;
    }
}`,
    },
    tags: ['time', '24-hour', 'clock', 'hours', 'minutes', 'seconds', 'format'],
    difficulty: 'beginner',
  },

  {
    slug: 'time-12h',
    name: 'Time (12-hour AM/PM)',
    icon: '⏰',
    category: 'formatting',
    description: 'Match 12-hour time with AM/PM',
    pattern: '(?:1[0-2]|0?[1-9]):[0-5]\\d\\s?(?:AM|PM|am|pm)',
    defaultFlags: 'g',
    sampleTestString: 'Wake up at 7:30 AM, meeting at 2:15 PM, dinner 6:00pm\nInvalid: 13:00 PM, 0:00 AM',
    edgeCases: [
      { input: '7:30 AM', shouldMatch: true, explanation: 'Morning time' },
      { input: '12:00 PM', shouldMatch: true, explanation: 'Noon' },
      { input: '6:00pm', shouldMatch: true, explanation: 'No space before PM' },
      { input: '13:00 PM', shouldMatch: false, explanation: '13 invalid in 12h format' },
    ],
    codeSnippets: {
      javascript: `const time12Regex = /(?:1[0-2]|0?[1-9]):[0-5]\\d\\s?(?:AM|PM|am|pm)/g;

function findTimes12h(text) {
  return text.match(time12Regex) || [];
}`,
      python: `import re

time12_pattern = r'(?:1[0-2]|0?[1-9]):[0-5]\\d\\s?(?:AM|PM|am|pm)'

def find_times_12h(text: str) -> list[str]:
    return re.findall(time12_pattern, text)`,
      go: `package main

import "regexp"

var time12Regex = regexp.MustCompile(` + '`(?:1[0-2]|0?[1-9]):[0-5]\\d\\s?(?:AM|PM|am|pm)`' + `)

func findTimes12h(text string) []string {
    return time12Regex.FindAllString(text, -1)
}`,
      php: `<?php
function findTimes12h(string $text): array {
    preg_match_all('/(?:1[0-2]|0?[1-9]):[0-5]\\d\\s?(?:AM|PM|am|pm)/', $text, $matches);
    return $matches[0];
}`,
      java: `import java.util.regex.*;
import java.util.*;

public class Time12Finder {
    private static final Pattern TIME12 = Pattern.compile(
        "(?:1[0-2]|0?[1-9]):[0-5]\\\\d\\\\s?(?:AM|PM|am|pm)");

    public static List<String> findAll(String text) {
        List<String> r = new ArrayList<>();
        Matcher m = TIME12.matcher(text);
        while (m.find()) r.add(m.group());
        return r;
    }
}`,
    },
    tags: ['time', '12-hour', 'am', 'pm', 'clock', 'format'],
    difficulty: 'beginner',
  },

  {
    slug: 'zip-code-us',
    name: 'US Zip Code',
    icon: '📮',
    category: 'formatting',
    description: 'Match US ZIP codes (5-digit and ZIP+4)',
    pattern: '\\b\\d{5}(?:-\\d{4})?\\b',
    defaultFlags: 'g',
    sampleTestString: 'Address: 123 Main St, Anytown, CA 90210\nZIP+4: 10001-1234\nInvalid: 1234, 123456, 90210-12',
    edgeCases: [
      { input: '90210', shouldMatch: true, explanation: '5-digit ZIP' },
      { input: '10001-1234', shouldMatch: true, explanation: 'ZIP+4 format' },
      { input: '1234', shouldMatch: false, explanation: 'Only 4 digits' },
      { input: '123456', shouldMatch: false, explanation: '6 digits (no dash)' },
    ],
    codeSnippets: {
      javascript: `const zipRegex = /\\b\\d{5}(?:-\\d{4})?\\b/g;

function findZipCodes(text) {
  return text.match(zipRegex) || [];
}`,
      python: `import re

zip_pattern = r'\\b\\d{5}(?:-\\d{4})?\\b'

def find_zip_codes(text: str) -> list[str]:
    return re.findall(zip_pattern, text)`,
      go: `package main

import "regexp"

var zipRegex = regexp.MustCompile(` + '`\\b\\d{5}(?:-\\d{4})?\\b`' + `)

func findZipCodes(text string) []string {
    return zipRegex.FindAllString(text, -1)
}`,
      php: `<?php
function findZipCodes(string $text): array {
    preg_match_all('/\\b\\d{5}(?:-\\d{4})?\\b/', $text, $matches);
    return $matches[0];
}`,
      java: `import java.util.regex.*;
import java.util.*;

public class ZipCodeFinder {
    private static final Pattern ZIP = Pattern.compile("\\\\b\\\\d{5}(?:-\\\\d{4})?\\\\b");

    public static List<String> findAll(String text) {
        List<String> r = new ArrayList<>();
        Matcher m = ZIP.matcher(text);
        while (m.find()) r.add(m.group());
        return r;
    }
}`,
    },
    tags: ['zip', 'zipcode', 'postal', 'address', 'us', 'format'],
    difficulty: 'beginner',
  },

  // ═══════════════════════════════════════════════════
  // PARSING
  // ═══════════════════════════════════════════════════
  {
    slug: 'markdown-links',
    name: 'Markdown Links',
    icon: '🔗',
    category: 'parsing',
    description: 'Parse [text](url) markdown link syntax',
    pattern: '\\[([^\\]]+)\\]\\(([^)]+)\\)',
    defaultFlags: 'g',
    sampleTestString: 'Check out [Google](https://google.com) and [GitHub](https://github.com)\nAlso [my blog](https://blog.example.com/post-1)\nNot links: [broken(link), (text)[url]',
    edgeCases: [
      { input: '[Google](https://google.com)', shouldMatch: true, explanation: 'Standard MD link' },
      { input: '[text with spaces](url)', shouldMatch: true, explanation: 'Spaces in link text' },
      { input: '[broken(link)', shouldMatch: false, explanation: 'Missing URL part' },
    ],
    codeSnippets: {
      javascript: `const mdLinkRegex = /\\[([^\\]]+)\\]\\(([^)]+)\\)/g;

function parseMarkdownLinks(text) {
  const links = [];
  let match;
  while ((match = mdLinkRegex.exec(text)) !== null) {
    links.push({ text: match[1], url: match[2] });
  }
  return links;
}`,
      python: `import re

md_link_pattern = r'\\[([^\\]]+)\\]\\(([^)]+)\\)'

def parse_md_links(text: str) -> list[dict]:
    return [{"text": m[0], "url": m[1]} 
            for m in re.findall(md_link_pattern, text)]`,
      go: `package main

import "regexp"

type Link struct {
    Text string
    URL  string
}

var mdLinkRegex = regexp.MustCompile(` + "`" + `\[([^\]]+)\]\(([^)]+)\)` + "`" + `)

func parseMDLinks(text string) []Link {
    matches := mdLinkRegex.FindAllStringSubmatch(text, -1)
    links := make([]Link, len(matches))
    for i, m := range matches {
        links[i] = Link{Text: m[1], URL: m[2]}
    }
    return links
}`,
      php: `<?php
function parseMarkdownLinks(string $text): array {
    preg_match_all('/\\[([^\\]]+)\\]\\(([^)]+)\\)/', $text, $matches, PREG_SET_ORDER);
    return array_map(fn($m) => ['text' => $m[1], 'url' => $m[2]], $matches);
}`,
      java: `import java.util.regex.*;
import java.util.*;

public class MarkdownParser {
    private static final Pattern MD_LINK = Pattern.compile("\\\\[([^\\\\]]+)\\\\]\\\\(([^)]+)\\\\)");

    public static List<String[]> parseLinks(String text) {
        List<String[]> links = new ArrayList<>();
        Matcher m = MD_LINK.matcher(text);
        while (m.find()) {
            links.add(new String[]{m.group(1), m.group(2)});
        }
        return links;
    }
}`,
    },
    tags: ['markdown', 'link', 'parse', 'md', 'url', 'text'],
    difficulty: 'intermediate',
  },

  {
    slug: 'markdown-headers',
    name: 'Markdown Headers',
    icon: '📝',
    category: 'parsing',
    description: 'Parse # through ###### markdown headers',
    pattern: '^(#{1,6})\\s+(.+)$',
    defaultFlags: 'gm',
    sampleTestString: '# Main Title\n## Section\n### Subsection\n#### Deep\n\nNot a header:\n#NoSpace\n####### Too many',
    edgeCases: [
      { input: '# Title', shouldMatch: true, explanation: 'H1 header' },
      { input: '### Subsection', shouldMatch: true, explanation: 'H3 header' },
      { input: '#NoSpace', shouldMatch: false, explanation: 'No space after #' },
      { input: '####### Seven', shouldMatch: false, explanation: 'Max is 6 levels' },
    ],
    codeSnippets: {
      javascript: `const headerRegex = /^(#{1,6})\\s+(.+)$/gm;

function parseHeaders(markdown) {
  const headers = [];
  let match;
  while ((match = headerRegex.exec(markdown)) !== null) {
    headers.push({ level: match[1].length, text: match[2] });
  }
  return headers;
}`,
      python: `import re

header_pattern = r'^(#{1,6})\\s+(.+)$'

def parse_headers(markdown: str) -> list[dict]:
    return [{"level": len(m[0]), "text": m[1]} 
            for m in re.findall(header_pattern, markdown, re.MULTILINE)]`,
      go: `package main

import "regexp"

type Header struct {
    Level int
    Text  string
}

var headerRegex = regexp.MustCompile(` + "`(?m)^(#{1,6})\\s+(.+)$`" + `)

func parseHeaders(md string) []Header {
    matches := headerRegex.FindAllStringSubmatch(md, -1)
    headers := make([]Header, len(matches))
    for i, m := range matches {
        headers[i] = Header{Level: len(m[1]), Text: m[2]}
    }
    return headers
}`,
      php: `<?php
function parseHeaders(string $markdown): array {
    preg_match_all('/^(#{1,6})\\s+(.+)$/m', $markdown, $matches, PREG_SET_ORDER);
    return array_map(fn($m) => [
        'level' => strlen($m[1]),
        'text' => $m[2]
    ], $matches);
}`,
      java: `import java.util.regex.*;
import java.util.*;

public class MarkdownHeaderParser {
    private static final Pattern HEADER = Pattern.compile("^(#{1,6})\\\\s+(.+)$", Pattern.MULTILINE);

    public static List<Map<String, Object>> parse(String md) {
        List<Map<String, Object>> headers = new ArrayList<>();
        Matcher m = HEADER.matcher(md);
        while (m.find()) {
            Map<String, Object> h = new HashMap<>();
            h.put("level", m.group(1).length());
            h.put("text", m.group(2));
            headers.add(h);
        }
        return headers;
    }
}`,
    },
    tags: ['markdown', 'header', 'heading', 'h1', 'h2', 'parse', 'md'],
    difficulty: 'beginner',
  },

  {
    slug: 'query-string',
    name: 'Query String Parameters',
    icon: '🔎',
    category: 'parsing',
    description: 'Parse key=value pairs from URL query strings',
    pattern: '[?&]([^=&]+)=([^&]*)',
    defaultFlags: 'g',
    sampleTestString: '?name=John&age=30&city=New+York&empty=\nhttps://example.com/search?q=regex&lang=en&page=1',
    edgeCases: [
      { input: '?name=John', shouldMatch: true, explanation: 'First parameter' },
      { input: '&age=30', shouldMatch: true, explanation: 'Subsequent parameter' },
      { input: '&empty=', shouldMatch: true, explanation: 'Empty value' },
    ],
    codeSnippets: {
      javascript: `const queryRegex = /[?&]([^=&]+)=([^&]*)/g;

function parseQueryString(url) {
  const params = {};
  let match;
  while ((match = queryRegex.exec(url)) !== null) {
    params[decodeURIComponent(match[1])] = decodeURIComponent(match[2]);
  }
  return params;
}

// Note: For production, use URLSearchParams API`,
      python: `import re
from urllib.parse import unquote

query_pattern = r'[?&]([^=&]+)=([^&]*)'

def parse_query_string(url: str) -> dict[str, str]:
    return {unquote(k): unquote(v) 
            for k, v in re.findall(query_pattern, url)}

# Note: For production, use urllib.parse.parse_qs`,
      go: `package main

import (
    "net/url"
    "regexp"
)

var queryRegex = regexp.MustCompile(` + "`" + `[?&]([^=&]+)=([^&]*)` + "`" + `)

func parseQueryString(rawURL string) map[string]string {
    params := make(map[string]string)
    matches := queryRegex.FindAllStringSubmatch(rawURL, -1)
    for _, m := range matches {
        key, _ := url.QueryUnescape(m[1])
        val, _ := url.QueryUnescape(m[2])
        params[key] = val
    }
    return params
}`,
      php: `<?php
function parseQueryStringRegex(string $url): array {
    preg_match_all('/[?&]([^=&]+)=([^&]*)/', $url, $matches, PREG_SET_ORDER);
    $params = [];
    foreach ($matches as $m) {
        $params[urldecode($m[1])] = urldecode($m[2]);
    }
    return $params;
}

// Note: For production, use parse_str()`,
      java: `import java.util.regex.*;
import java.util.*;
import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;

public class QueryParser {
    private static final Pattern QUERY = Pattern.compile("[?&]([^=&]+)=([^&]*)");

    public static Map<String, String> parse(String url) {
        Map<String, String> params = new LinkedHashMap<>();
        Matcher m = QUERY.matcher(url);
        while (m.find()) {
            params.put(
                URLDecoder.decode(m.group(1), StandardCharsets.UTF_8),
                URLDecoder.decode(m.group(2), StandardCharsets.UTF_8)
            );
        }
        return params;
    }
}`,
    },
    tags: ['query', 'parameter', 'url', 'parse', 'key', 'value', 'search'],
    difficulty: 'intermediate',
  },

  {
    slug: 'log-timestamp',
    name: 'Log File Timestamp',
    icon: '📋',
    category: 'parsing',
    description: 'Parse common log file timestamp format',
    pattern: '\\d{4}-\\d{2}-\\d{2}[T\\s]\\d{2}:\\d{2}:\\d{2}(?:\\.\\d+)?(?:Z|[+-]\\d{2}:?\\d{2})?',
    defaultFlags: 'g',
    sampleTestString: '[2024-01-15T09:30:45.123Z] INFO: Server started\n[2024-01-15 09:31:00+05:30] WARN: High memory\n[2024-01-15T09:32:00-05:00] ERROR: Connection lost',
    edgeCases: [
      { input: '2024-01-15T09:30:45.123Z', shouldMatch: true, explanation: 'ISO 8601 with ms and Z' },
      { input: '2024-01-15 09:31:00+05:30', shouldMatch: true, explanation: 'Space separator + timezone' },
      { input: '2024-01-15T09:32:00', shouldMatch: true, explanation: 'No timezone' },
    ],
    codeSnippets: {
      javascript: `const logTimestampRegex = /\\d{4}-\\d{2}-\\d{2}[T\\s]\\d{2}:\\d{2}:\\d{2}(?:\\.\\d+)?(?:Z|[+-]\\d{2}:?\\d{2})?/g;

function extractTimestamps(logText) {
  return logText.match(logTimestampRegex) || [];
}`,
      python: `import re

log_ts_pattern = r'\\d{4}-\\d{2}-\\d{2}[T\\s]\\d{2}:\\d{2}:\\d{2}(?:\\.\\d+)?(?:Z|[+-]\\d{2}:?\\d{2})?'

def extract_timestamps(log_text: str) -> list[str]:
    return re.findall(log_ts_pattern, log_text)`,
      go: `package main

import "regexp"

var logTSRegex = regexp.MustCompile(` + "`" + `\d{4}-\d{2}-\d{2}[T\s]\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:?\d{2})?` + "`" + `)

func extractTimestamps(logText string) []string {
    return logTSRegex.FindAllString(logText, -1)
}`,
      php: `<?php
function extractTimestamps(string $logText): array {
    $pattern = '/\\d{4}-\\d{2}-\\d{2}[T\\s]\\d{2}:\\d{2}:\\d{2}(?:\\.\\d+)?(?:Z|[+-]\\d{2}:?\\d{2})?/';
    preg_match_all($pattern, $logText, $matches);
    return $matches[0];
}`,
      java: `import java.util.regex.*;
import java.util.*;

public class LogTimestampParser {
    private static final Pattern TIMESTAMP = Pattern.compile(
        "\\\\d{4}-\\\\d{2}-\\\\d{2}[T\\\\s]\\\\d{2}:\\\\d{2}:\\\\d{2}(?:\\\\.\\\\d+)?(?:Z|[+-]\\\\d{2}:?\\\\d{2})?");

    public static List<String> extract(String logText) {
        List<String> r = new ArrayList<>();
        Matcher m = TIMESTAMP.matcher(logText);
        while (m.find()) r.add(m.group());
        return r;
    }
}`,
    },
    tags: ['log', 'timestamp', 'datetime', 'parse', 'server', 'iso8601'],
    difficulty: 'intermediate',
  },

  {
    slug: 'json-key-value',
    name: 'JSON Key-Value',
    icon: '📦',
    category: 'parsing',
    description: 'Extract key-value pairs from JSON-like strings',
    pattern: '"([^"]+)"\\s*:\\s*"([^"]*)"',
    defaultFlags: 'g',
    sampleTestString: '{"name": "John", "city": "New York", "age": "30"}\n{"empty": "", "key": "value with spaces"}',
    edgeCases: [
      { input: '"name": "John"', shouldMatch: true, explanation: 'String key-value pair' },
      { input: '"empty": ""', shouldMatch: true, explanation: 'Empty value' },
    ],
    codeSnippets: {
      javascript: `const jsonKVRegex = /"([^"]+)"\\s*:\\s*"([^"]*)"/g;

function extractKeyValues(text) {
  const pairs = {};
  let match;
  while ((match = jsonKVRegex.exec(text)) !== null) {
    pairs[match[1]] = match[2];
  }
  return pairs;
}

// Note: For real JSON, use JSON.parse()`,
      python: `import re

json_kv_pattern = r'"([^"]+)"\\s*:\\s*"([^"]*)"'

def extract_key_values(text: str) -> dict[str, str]:
    return dict(re.findall(json_kv_pattern, text))

# Note: For real JSON, use json.loads()`,
      go: `package main

import "regexp"

var jsonKVRegex = regexp.MustCompile(` + "`" + `"([^"]+)"\s*:\s*"([^"]*)"` + "`" + `)

func extractKeyValues(text string) map[string]string {
    matches := jsonKVRegex.FindAllStringSubmatch(text, -1)
    result := make(map[string]string)
    for _, m := range matches {
        result[m[1]] = m[2]
    }
    return result
}`,
      php: `<?php
function extractKeyValues(string $text): array {
    preg_match_all('/"([^"]+)"\\s*:\\s*"([^"]*)"/', $text, $matches, PREG_SET_ORDER);
    $result = [];
    foreach ($matches as $m) {
        $result[$m[1]] = $m[2];
    }
    return $result;
}`,
      java: `import java.util.regex.*;
import java.util.*;

public class JsonKVParser {
    private static final Pattern KV = Pattern.compile("\"([^\"]+)\"\\\\s*:\\\\s*\"([^\"]*)\"");

    public static Map<String, String> extract(String text) {
        Map<String, String> result = new LinkedHashMap<>();
        Matcher m = KV.matcher(text);
        while (m.find()) result.put(m.group(1), m.group(2));
        return result;
    }
}`,
    },
    tags: ['json', 'key', 'value', 'parse', 'object', 'data'],
    difficulty: 'intermediate',
  },

  {
    slug: 'csv-fields',
    name: 'CSV Fields',
    icon: '📊',
    category: 'parsing',
    description: 'Parse comma-separated values (handles quoted fields)',
    pattern: '(?:^|,)\\s*(?:"([^"]*)"|([^,"]*))',
    defaultFlags: 'g',
    sampleTestString: 'John,Doe,"New York",30\n"Smith, Jr.",Jane,"Los Angeles",25\nSimple,CSV,Data,Here',
    edgeCases: [
      { input: 'a,b,c', shouldMatch: true, explanation: 'Simple unquoted CSV' },
      { input: '"hello, world",test', shouldMatch: true, explanation: 'Quoted field with comma' },
    ],
    codeSnippets: {
      javascript: `// For robust CSV parsing, use a library like PapaParse
const csvFieldRegex = /(?:^|,)\\s*(?:"([^"]*)"|([^,"]*))/g;

function parseCSVLine(line) {
  const fields = [];
  let match;
  while ((match = csvFieldRegex.exec(line)) !== null) {
    fields.push(match[1] !== undefined ? match[1] : match[2]);
  }
  return fields;
}`,
      python: `import re

csv_pattern = r'(?:^|,)\\s*(?:"([^"]*)"|([^,"]*))'

def parse_csv_line(line: str) -> list[str]:
    return [q or u for q, u in re.findall(csv_pattern, line)]

# Note: For production, use the csv module`,
      go: `package main

import "regexp"

var csvFieldRegex = regexp.MustCompile(` + "`" + `(?:^|,)\s*(?:"([^"]*)"|([^,"]*))` + "`" + `)

func parseCSVLine(line string) []string {
    matches := csvFieldRegex.FindAllStringSubmatch(line, -1)
    fields := make([]string, len(matches))
    for i, m := range matches {
        if m[1] != "" {
            fields[i] = m[1]
        } else {
            fields[i] = m[2]
        }
    }
    return fields
}`,
      php: `<?php
function parseCSVLine(string $line): array {
    preg_match_all('/(?:^|,)\\s*(?:"([^"]*)"|([^,"]*))/', $line, $matches, PREG_SET_ORDER);
    return array_map(fn($m) => $m[1] !== '' ? $m[1] : ($m[2] ?? ''), $matches);
}

// Note: For production, use str_getcsv()`,
      java: `import java.util.regex.*;
import java.util.*;

public class CSVParser {
    private static final Pattern CSV = Pattern.compile("(?:^|,)\\\\s*(?:\"([^\"]*)\"|([^,\"]*))");

    public static List<String> parseLine(String line) {
        List<String> fields = new ArrayList<>();
        Matcher m = CSV.matcher(line);
        while (m.find()) {
            fields.add(m.group(1) != null ? m.group(1) : m.group(2));
        }
        return fields;
    }
}`,
    },
    tags: ['csv', 'comma', 'separated', 'parse', 'data', 'spreadsheet'],
    difficulty: 'advanced',
  },

  {
    slug: 'html-attributes',
    name: 'HTML Attributes',
    icon: '🏗️',
    category: 'parsing',
    description: 'Extract attribute="value" pairs from HTML tags',
    pattern: '([a-zA-Z\\-]+)\\s*=\\s*"([^"]*)"',
    defaultFlags: 'g',
    sampleTestString: '<div class="container" id="main" data-value="test">\n<input type="text" placeholder="Enter name" required>\n<a href="https://example.com" target="_blank">Link</a>',
    edgeCases: [
      { input: 'class="container"', shouldMatch: true, explanation: 'Simple attribute' },
      { input: 'data-value="test"', shouldMatch: true, explanation: 'Hyphenated attribute' },
      { input: 'href="https://example.com"', shouldMatch: true, explanation: 'URL value' },
    ],
    codeSnippets: {
      javascript: `const attrRegex = /([a-zA-Z\\-]+)\\s*=\\s*"([^"]*)"/g;

function extractAttributes(html) {
  const attrs = {};
  let match;
  while ((match = attrRegex.exec(html)) !== null) {
    attrs[match[1]] = match[2];
  }
  return attrs;
}`,
      python: `import re

attr_pattern = r'([a-zA-Z\\-]+)\\s*=\\s*"([^"]*)"'

def extract_attributes(html: str) -> dict[str, str]:
    return dict(re.findall(attr_pattern, html))`,
      go: `package main

import "regexp"

var attrRegex = regexp.MustCompile(` + "`" + `([a-zA-Z\-]+)\s*=\s*"([^"]*)"` + "`" + `)

func extractAttributes(html string) map[string]string {
    matches := attrRegex.FindAllStringSubmatch(html, -1)
    attrs := make(map[string]string)
    for _, m := range matches {
        attrs[m[1]] = m[2]
    }
    return attrs
}`,
      php: `<?php
function extractAttributes(string $html): array {
    preg_match_all('/([a-zA-Z\\-]+)\\s*=\\s*"([^"]*)"/', $html, $matches, PREG_SET_ORDER);
    $attrs = [];
    foreach ($matches as $m) {
        $attrs[$m[1]] = $m[2];
    }
    return $attrs;
}`,
      java: `import java.util.regex.*;
import java.util.*;

public class HtmlAttrParser {
    private static final Pattern ATTR = Pattern.compile("([a-zA-Z\\\\-]+)\\\\s*=\\\\s*\"([^\"]*)\"");

    public static Map<String, String> extract(String html) {
        Map<String, String> attrs = new LinkedHashMap<>();
        Matcher m = ATTR.matcher(html);
        while (m.find()) attrs.put(m.group(1), m.group(2));
        return attrs;
    }
}`,
    },
    tags: ['html', 'attribute', 'parse', 'tag', 'element', 'dom'],
    difficulty: 'intermediate',
  },

  // ═══════════════════════════════════════════════════
  // MORE EXTRACTION
  // ═══════════════════════════════════════════════════

  {
    slug: 'extract-image-urls',
    name: 'Image URLs from HTML',
    icon: '🖼️',
    category: 'extraction',
    description: 'Extract image src URLs from HTML img tags',
    pattern: '<img[^>]+src\\s*=\\s*"([^"]+)"',
    defaultFlags: 'gi',
    sampleTestString: '<img src="photo.jpg" alt="Photo">\n<img class="avatar" src="https://cdn.example.com/avatar.png" />\n<IMG SRC="banner.webp" width="100">',
    edgeCases: [
      { input: '<img src="photo.jpg">', shouldMatch: true, explanation: 'Simple img tag' },
      { input: '<img class="x" src="pic.png" />', shouldMatch: true, explanation: 'Src not first attribute' },
      { input: '<a src="link.html">', shouldMatch: false, explanation: 'Not an img tag' },
    ],
    codeSnippets: {
      javascript: `const imgSrcRegex = /<img[^>]+src\\s*=\\s*"([^"]+)"/gi;

function extractImageUrls(html) {
  const urls = [];
  let match;
  while ((match = imgSrcRegex.exec(html)) !== null) {
    urls.push(match[1]);
  }
  return urls;
}`,
      python: `import re

img_src_pattern = r'<img[^>]+src\\s*=\\s*"([^"]+)"'

def extract_image_urls(html: str) -> list[str]:
    return re.findall(img_src_pattern, html, re.IGNORECASE)`,
      go: `package main

import "regexp"

var imgSrcRegex = regexp.MustCompile(` + "`(?i)" + `<img[^>]+src\\s*=\\s*"([^"]+)"` + "`" + `)

func extractImageURLs(html string) []string {
    matches := imgSrcRegex.FindAllStringSubmatch(html, -1)
    urls := make([]string, len(matches))
    for i, m := range matches {
        urls[i] = m[1]
    }
    return urls
}`,
      php: `<?php
function extractImageUrls(string $html): array {
    preg_match_all('/<img[^>]+src\\s*=\\s*"([^"]+)"/i', $html, $matches);
    return $matches[1];
}`,
      java: `import java.util.regex.*;
import java.util.*;

public class ImageUrlExtractor {
    private static final Pattern IMG_SRC = Pattern.compile(
        "<img[^>]+src\\\\s*=\\\\s*\"([^\"]+)\"", Pattern.CASE_INSENSITIVE);

    public static List<String> extract(String html) {
        List<String> urls = new ArrayList<>();
        Matcher m = IMG_SRC.matcher(html);
        while (m.find()) urls.add(m.group(1));
        return urls;
    }
}`,
    },
    tags: ['image', 'img', 'src', 'html', 'url', 'extract', 'picture'],
    difficulty: 'intermediate',
  },
];

export const categories = [
  { id: 'all' as const, name: 'All', icon: '📚' },
  { id: 'validation' as const, name: 'Validation', icon: '✅' },
  { id: 'extraction' as const, name: 'Extraction', icon: '🔍' },
  { id: 'formatting' as const, name: 'Formatting', icon: '📐' },
  { id: 'parsing' as const, name: 'Parsing', icon: '🔧' },
  { id: 'security' as const, name: 'Security', icon: '🔒' },
];

export function getRecipeBySlug(slug: string): Recipe | undefined {
  return recipes.find((r) => r.slug === slug);
}

export function getRecipesByCategory(category: string): Recipe[] {
  if (category === 'all') return recipes;
  return recipes.filter((r) => r.category === category);
}

export function searchRecipes(query: string): Recipe[] {
  const q = query.toLowerCase().trim();
  if (!q) return recipes;
  return recipes.filter(
    (r) =>
      r.name.toLowerCase().includes(q) ||
      r.description.toLowerCase().includes(q) ||
      r.tags.some((t) => t.toLowerCase().includes(q)) ||
      r.category.toLowerCase().includes(q)
  );
}