/**
 * SunCalc is a JavaScript library for calculating sun position, sun light phases (times for sunrise, sunset, etc.),
 * and moon position and lunar phase.
 * https://github.com/mourner/suncalc
 */

(function (root, factory) { 
    if (typeof define === 'function' && define.amd) {
        define(factory);
    } else if (typeof module === 'object' && module.exports) {
        module.exports = factory();
    } else {
        root.SunCalc = factory();
    }
}(this, function () {
    'use strict';

    // all times are expressed in decimal hours (e.g. 12:30 = 12.5)

    // sun calculations are based on http://aa.quae.nl/en/reken/zonpositie.html
    // algorithm that takes the observer's elevation into account:
    // http://www.stjarnhimlen.se/comp/ppcomp.html

    var PI = Math.PI,
        sin = Math.sin,
        cos = Math.cos,
        tan = Math.tan,
        asin = Math.asin,
        atan2 = Math.atan2,
        sqrt = Math.sqrt,
        degree = PI / 180;

    // sun positions at 00:00 UTC
    function sunPosition(d, J2000) {
        var n = J2000,
            L = (280.46 + 0.9856474 * n) % 360,
            M = (357.5291 + 0.98560028 * n) % 360,
            e = 0.016708634 - 0.000042037 * n - 0.0000001267 * n * n,
            C = (1.9146 - 0.004817 * n - 0.000014 * n * n) * sin(M * degree) +
                (0.019993 - 0.000101 * n) * sin(2 * M * degree) +
                0.000289 * sin(3 * M * degree),
            P = L + C,
            R = 1.000001018 * (1 - e * e) / (1 + e * cos((M + C) * degree));

        return {
            dec: asin(sin(P * degree) * sin(23.4397 * degree)) / degree,
            ra: (atan2(sin(P * degree), cos(P * degree)) / degree + 360) % 360
        };
    }

    // moon positions at 00:00 UTC
    function moonPosition(d, J2000) {
        var n = J2000,
            Ls = (280.46 + 0.9856474 * n) % 360,
            Lm = (218.3165 + 13.17639648 * n) % 360,
            D = (297.8502 + 12.199708 * n) % 360,
            F = (93.2721 + 13.064993 * n) % 360,
            Mm = (357.5291 + 0.98560028 * n) % 360,
            Mm2 = (134.9634 + 13.063209 * n) % 360,
            Ec = 1.2739 * sin((2 * D - Mm2) * degree),
            A1 = 0.6583 * sin(2 * D * degree),
            A2 = 0.1858 * sin(Mm * degree),
            A3 = 0.0291 * sin(2 * F * degree),
            A4 = 0.0148 * sin(2 * (D - Mm2) * degree),
            A5 = 0.0093 * sin(2 * (D - Mm) * degree),
            A6 = 0.0077 * sin((D - Mm2) * degree),
            A7 = 0.0050 * sin((D - 2 * Mm2) * degree),
            A8 = 0.0045 * sin((D + Mm2) * degree),
            A9 = 0.0044 * sin((D - 3 * Mm2) * degree),
            A10 = 0.0044 * sin((D + Mm) * degree),
            A11 = 0.0035 * sin((D - 2 * Mm) * degree),
            A12 = 0.0031 * sin((D + 2 * Mm2) * degree),
            A13 = 0.0028 * sin((D - 4 * Mm2) * degree),
            A14 = 0.0025 * sin((D + 3 * Mm2) * degree),
            A15 = 0.0023 * sin((D - 5 * Mm2) * degree),
            A16 = 0.0020 * sin((D + 4 * Mm2) * degree),
            A17 = 0.0019 * sin((D - Mm) * degree),
            A18 = 0.0017 * sin((D + 5 * Mm2) * degree),
            A19 = 0.0016 * sin((D - 6 * Mm2) * degree),
            A20 = 0.0015 * sin((D + 6 * Mm2) * degree),
            A21 = 0.0014 * sin((D - 7 * Mm2) * degree),
            A22 = 0.0013 * sin((D + 7 * Mm2) * degree),
            A23 = 0.0012 * sin((D - 8 * Mm2) * degree),
            A24 = 0.0011 * sin((D + 8 * Mm2) * degree),
            A25 = 0.0010 * sin((D - 9 * Mm2) * degree),
            A26 = 0.0010 * sin((D + 9 * Mm2) * degree),
            A27 = 0.0009 * sin((D - 10 * Mm2) * degree),
            A28 = 0.0008 * sin((D + 10 * Mm2) * degree),
            A29 = 0.0007 * sin((D - 11 * Mm2) * degree),
            A30 = 0.0007 * sin((D + 11 * Mm2) * degree),
            A31 = 0.0006 * sin((D - 12 * Mm2) * degree),
            A32 = 0.0006 * sin((D + 12 * Mm2) * degree),
            A33 = 0.0005 * sin((D - 13 * Mm2) * degree),
            A34 = 0.0005 * sin((D + 13 * Mm2) * degree),
            A35 = 0.0004 * sin((D - 14 * Mm2) * degree),
            A36 = 0.0004 * sin((D + 14 * Mm2) * degree),
            A37 = 0.0003 * sin((D - 15 * Mm2) * degree),
            A38 = 0.0003 * sin((D + 15 * Mm2) * degree),
            A39 = 0.0002 * sin((D - 16 * Mm2) * degree),
            A40 = 0.0002 * sin((D + 16 * Mm2) * degree),
            A41 = 0.0002 * sin((D - 17 * Mm2) * degree),
            A42 = 0.0002 * sin((D + 17 * Mm2) * degree),
            A43 = 0.0001 * sin((D - 18 * Mm2) * degree),
            A44 = 0.0001 * sin((D + 18 * Mm2) * degree),
            A45 = 0.0001 * sin((D - 19 * Mm2) * degree),
            A46 = 0.0001 * sin((D + 19 * Mm2) * degree),
            A47 = 0.0001 * sin((D - 20 * Mm2) * degree),
            A48 = 0.0001 * sin((D + 20 * Mm2) * degree),
            A49 = 0.0001 * sin((D - 21 * Mm2) * degree),
            A50 = 0.0001 * sin((D + 21 * Mm2) * degree),
            A51 = 0.0001 * sin((D - 22 * Mm2) * degree),
            A52 = 0.0001 * sin((D + 22 * Mm2) * degree),
            A53 = 0.0001 * sin((D - 23 * Mm2) * degree),
            A54 = 0.0001 * sin((D + 23 * Mm2) * degree),
            A55 = 0.0001 * sin((D - 24 * Mm2) * degree),
            A56 = 0.0001 * sin((D + 24 * Mm2) * degree),
            A57 = 0.0001 * sin((D - 25 * Mm2) * degree),
            A58 = 0.0001 * sin((D + 25 * Mm2) * degree),
            A59 = 0.0001 * sin((D - 26 * Mm2) * degree),
            A60 = 0.0001 * sin((D + 26 * Mm2) * degree),
            A61 = 0.0001 * sin((D - 27 * Mm2) * degree),
            A62 = 0.0001 * sin((D + 27 * Mm2) * degree),
            A63 = 0.0001 * sin((D - 28 * Mm2) * degree),
            A64 = 0.0001 * sin((D + 28 * Mm2) * degree),
            A65 = 0.0001 * sin((D - 29 * Mm2) * degree),
            A66 = 0.0001 * sin((D + 29 * Mm2) * degree),
            A67 = 0.0001 * sin((D - 30 * Mm2) * degree),
            A68 = 0.0001 * sin((D + 30 * Mm2) * degree),
            A69 = 0.0001 * sin((D - 31 * Mm2) * degree),
            A70 = 0.0001 * sin((D + 31 * Mm2) * degree),
            A71 = 0.0001 * sin((D - 32 * Mm2) * degree),
            A72 = 0.0001 * sin((D + 32 * Mm2) * degree),
            A73 = 0.0001 * sin((D - 33 * Mm2) * degree),
            A74 = 0.0001 * sin((D + 33 * Mm2) * degree),
            A75 = 0.0001 * sin((D - 34 * Mm2) * degree),
            A76 = 0.0001 * sin((D + 34 * Mm2) * degree),
            A77 = 0.0001 * sin((D - 35 * Mm2) * degree),
            A78 = 0.0001 * sin((D + 35 * Mm2) * degree),
            A79 = 0.0001 * sin((D - 36 * Mm2) * degree),
            A80 = 0.0001 * sin((D + 36 * Mm2) * degree),
            A81 = 0.0001 * sin((D - 37 * Mm2) * degree),
            A82 = 0.0001 * sin((D + 37 * Mm2) * degree),
            A83 = 0.0001 * sin((D - 38 * Mm2) * degree),
            A84 = 0.0001 * sin((D + 38 * Mm2) * degree),
            A85 = 0.0001 * sin((D - 39 * Mm2) * degree),
            A86 = 0.0001 * sin((D + 39 * Mm2) * degree),
            A87 = 0.0001 * sin((D - 40 * Mm2) * degree),
            A88 = 0.0001 * sin((D + 40 * Mm2) * degree),
            A89 = 0.0001 * sin((D - 41 * Mm2) * degree),
            A90 = 0.0001 * sin((D + 41 * Mm2) * degree),
            A91 = 0.0001 * sin((D - 42 * Mm2) * degree),
            A92 = 0.0001 * sin((D + 42 * Mm2) * degree),
            A93 = 0.0001 * sin((D - 43 * Mm2) * degree),
            A94 = 0.0001 * sin((D + 43 * Mm2) * degree),
            A95 = 0.0001 * sin((D - 44 * Mm2) * degree),
            A96 = 0.0001 * sin((D + 44 * Mm2) * degree),
            A97 = 0.0001 * sin((D - 45 * Mm2) * degree),
            A98 = 0.0001 * sin((D + 45 * Mm2) * degree),
            A99 = 0.0001 * sin((D - 46 * Mm2) * degree),
            A100 = 0.0001 * sin((D + 46 * Mm2) * degree),
            L = Lm + Ec + A1 + A2 + A3 + A4 + A5 + A6 + A7 + A8 + A9 + A10 + A11 + A12 + A13 + A14 + A15 + A16 + A17 + A18 + A19 + A20 + A21 + A22 + A23 + A24 + A25 + A26 + A27 + A28 + A29 + A30 + A31 + A32 + A33 + A34 + A35 + A36 + A37 + A38 + A39 + A40 + A41 + A42 + A43 + A44 + A45 + A46 + A47 + A48 + A49 + A50 + A51 + A52 + A53 + A54 + A55 + A56 + A57 + A58 + A59 + A60 + A61 + A62 + A63 + A64 + A65 + A66 + A67 + A68 + A69 + A70 + A71 + A72 + A73 + A74 + A75 + A76 + A77 + A78 + A79 + A80 + A81 + A82 + A83 + A84 + A85 + A86 + A87 + A88 + A89 + A90 + A91 + A92 + A93 + A94 + A95 + A96 + A97 + A98 + A99 + A100,
            B = 0.0023 * sin(2 * D * degree) + 0.0023 * sin((D + Mm2) * degree) + 0.0023 * sin((D - Mm2) * degree),
            R = 384400 * (1 - 0.0549 * cos(Mm2 * degree) - 0.00033 * cos(2 * D * degree) - 0.00021 * cos(2 * (D - Mm2) * degree));

        return {
            ra: L,
            dec: B,
            dist: R
        };
    }

    // calculates sun position for a given date and observer's position
    function getSunPosition(date, lat, lng, elevation) {
        var d = new Date(date),
            J2000 = (d - new Date('2000-01-01T12:00:00Z')) / 86400000,
            n = J2000 + 2451545 - 2451545,
            M = (357.5291 + 0.98560028 * n) % 360,
            L0 = (280.46 + 0.9856474 * n) % 360,
            C = (1.9146 - 0.004817 * n - 0.000014 * n * n) * sin(M * degree) +
                (0.019993 - 0.000101 * n) * sin(2 * M * degree) +
                0.000289 * sin(3 * M * degree),
            L = (L0 + C) % 360,
            deltaPsi = -0.00031737 * sin(13.72 * degree) * sin(0.0172 * n) +
                       -0.00003637 * sin(13.72 * degree) * sin(0.0344 * n) +
                       0.00000046 * sin(13.72 * degree) * sin(0.0516 * n),
            epsilon = 23.439291 - 0.0130042 * n / 36525 - 1.64e-7 * n * n / 36525 + 5.04e-7 * n * n * n / 36525 - 5.57e-10 * n * n * n * n / 36525,
            ra = atan2(cos(epsilon * degree) * sin(L * degree), cos(L * degree)) / degree,
            dec = asin(sin(epsilon * degree) * sin(L * degree)) / degree,
            sidereal = (280.46061837 + 360.98564736629 * (d.getTime() / 86400000 - 0.5) + 0.000387933 * n * n - n * n * n / 38710000) % 360,
            ha = (sidereal - lng - ra + 360) % 360,
            el = asin(sin(dec * degree) * sin(lat * degree) + cos(dec * degree) * cos(lat * degree) * cos(ha * degree)) / degree,
            az = atan2(-cos(dec * degree) * sin(ha * degree), sin(dec * degree) * cos(lat * degree) - cos(dec * degree) * sin(lat * degree) * cos(ha * degree)) / degree + 180;

        // adjust for atmospheric refraction
        if (el > 0) {
            var refraction = 0.0167 / tan((el + 7.31 / (el + 4.4)) * degree);
            el += refraction;
        }

        // adjust for observer's elevation
        if (elevation > 0) {
            var horizon = -2.076 * sqrt(elevation) / 60;
            el += horizon;
        }

        return {
            azimuth: (az + 360) % 360,
            altitude: el
        };
    }

    // calculates moon position for a given date and observer's position
    function getMoonPosition(date, lat, lng, elevation) {
        var d = new Date(date),
            J2000 = (d - new Date('2000-01-01T12:00:00Z')) / 86400000,
            n = J2000 + 2451545 - 2451545,
            Ls = (280.46 + 0.9856474 * n) % 360,
            Lm = (218.3165 + 13.17639648 * n) % 360,
            D = (297.8502 + 12.199708 * n) % 360,
            F = (93.2721 + 13.064993 * n) % 360,
            Mm = (357.5291 + 0.98560028 * n) % 360,
            Mm2 = (134.9634 + 13.063209 * n) % 360,
            Ec = 1.2739 * sin((2 * D - Mm2) * degree),
            A1 = 0.6583 * sin(2 * D * degree),
            A2 = 0.1858 * sin(Mm * degree),
            A3 = 0.0291 * sin(2 * F * degree),
            A4 = 0.0148 * sin(2 * (D - Mm2) * degree),
            A5 = 0.0093 * sin(2 * (D - Mm) * degree),
            A6 = 0.0077 * sin((D - Mm2) * degree),
            A7 = 0.0050 * sin((D - 2 * Mm2) * degree),
            A8 = 0.0045 * sin((D + Mm2) * degree),
            A9 = 0.0044 * sin((D - 3 * Mm2) * degree),
            A10 = 0.0044 * sin((D + Mm) * degree),
            A11 = 0.0035 * sin((D - 2 * Mm) * degree),
            A12 = 0.0031 * sin((D + 2 * Mm2) * degree),
            A13 = 0.0028 * sin((D - 4 * Mm2) * degree),
            A14 = 0.0025 * sin((D + 3 * Mm2) * degree),
            A15 = 0.0023 * sin((D - 5 * Mm2) * degree),
            A16 = 0.0020 * sin((D + 4 * Mm2) * degree),
            A17 = 0.0019 * sin((D - Mm) * degree),
            A18 = 0.0017 * sin((D + 5 * Mm2) * degree),
            A19 = 0.0016 * sin((D - 6 * Mm2) * degree),
            A20 = 0.0015 * sin((D + 6 * Mm2) * degree),
            A21 = 0.0014 * sin((D - 7 * Mm2) * degree),
            A22 = 0.0013 * sin((D + 7 * Mm2) * degree),
            A23 = 0.0012 * sin((D - 8 * Mm2) * degree),
            A24 = 0.0011 * sin((D + 8 * Mm2) * degree),
            A25 = 0.0010 * sin((D - 9 * Mm2) * degree),
            A26 = 0.0010 * sin((D + 9 * Mm2) * degree),
            A27 = 0.0009 * sin((D - 10 * Mm2) * degree),
            A28 = 0.0008 * sin((D + 10 * Mm2) * degree),
            A29 = 0.0007 * sin((D - 11 * Mm2) * degree),
            A30 = 0.0007 * sin((D + 11 * Mm2) * degree),
            A31 = 0.0006 * sin((D - 12 * Mm2) * degree),
            A32 = 0.0006 * sin((D + 12 * Mm2) * degree),
            A33 = 0.0005 * sin((D - 13 * Mm2) * degree),
            A34 = 0.0005 * sin((D + 13 * Mm2) * degree),
            A35 = 0.0004 * sin((D - 14 * Mm2) * degree),
            A36 = 0.0004 * sin((D + 14 * Mm2) * degree),
            A37 = 0.0003 * sin((D - 15 * Mm2) * degree),
            A38 = 0.0003 * sin((D + 15 * Mm2) * degree),
            A39 = 0.0002 * sin((D - 16 * Mm2) * degree),
            A40 = 0.0002 * sin((D + 16 * Mm2) * degree),
            A41 = 0.0002 * sin((D - 17 * Mm2) * degree),
            A42 = 0.0002 * sin((D + 17 * Mm2) * degree),
            A43 = 0.0001 * sin((D - 18 * Mm2) * degree),
            A44 = 0.0001 * sin((D + 18 * Mm2) * degree),
            A45 = 0.0001 * sin((D - 19 * Mm2) * degree),
            A46 = 0.0001 * sin((D + 19 * Mm2) * degree),
            A47 = 0.0001 * sin((D - 20 * Mm2) * degree),
            A48 = 0.0001 * sin((D + 20 * Mm2) * degree),
            A49 = 0.0001 * sin((D - 21 * Mm2) * degree),
            A50 = 0.0001 * sin((D + 21 * Mm2) * degree),
            A51 = 0.0001 * sin((D - 22 * Mm2) * degree),
            A52 = 0.0001 * sin((D + 22 * Mm2) * degree),
            A53 = 0.0001 * sin((D - 23 * Mm2) * degree),
            A54 = 0.0001 * sin((D + 23 * Mm2) * degree),
            A55 = 0.0001 * sin((D - 24 * Mm2) * degree),
            A56 = 0.0001 * sin((D + 24 * Mm2) * degree),
            A57 = 0.0001 * sin((D - 25 * Mm2) * degree),
            A58 = 0.0001 * sin((D + 25 * Mm2) * degree),
            A59 = 0.0001 * sin((D - 26 * Mm2) * degree),
            A60 = 0.0001 * sin((D + 26 * Mm2) * degree),
            A61 = 0.0001 * sin((D - 27 * Mm2) * degree),
            A62 = 0.0001 * sin((D + 27 * Mm2) * degree),
            A63 = 0.0001 * sin((D - 28 * Mm2) * degree),
            A64 = 0.0001 * sin((D + 28 * Mm2) * degree),
            A65 = 0.0001 * sin((D - 29 * Mm2) * degree),
            A66 = 0.0001 * sin((D + 29 * Mm2) * degree),
            A67 = 0.0001 * sin((D - 30 * Mm2) * degree),
            A68 = 0.0001 * sin((D + 30 * Mm2) * degree),
            A69 = 0.0001 * sin((D - 31 * Mm2) * degree),
            A70 = 0.0001 * sin((D + 31 * Mm2) * degree),
            A71 = 0.0001 * sin((D - 32 * Mm2) * degree),
            A72 = 0.0001 * sin((D + 32 * Mm2) * degree),
            A73 = 0.0001 * sin((D - 33 * Mm2) * degree),
            A74 = 0.0001 * sin((D + 33 * Mm2) * degree),
            A75 = 0.0001 * sin((D - 34 * Mm2) * degree),
            A76 = 0.0001 * sin((D + 34 * Mm2) * degree),
            A77 = 0.0001 * sin((D - 35 * Mm2) * degree),
            A78 = 0.0001 * sin((D + 35 * Mm2) * degree),
            A79 = 0.0001 * sin((D - 36 * Mm2) * degree),
            A80 = 0.0001 * sin((D + 36 * Mm2) * degree),
            A81 = 0.0001 * sin((D - 37 * Mm2) * degree),
            A82 = 0.0001 * sin((D + 37 * Mm2) * degree),
            A83 = 0.0001 * sin((D - 38 * Mm2) * degree),
            A84 = 0.0001 * sin((D + 38 * Mm2) * degree),
            A85 = 0.0001 * sin((D - 39 * Mm2) * degree),
            A86 = 0.0001 * sin((D + 39 * Mm2) * degree),
            A87 = 0.0001 * sin((D - 40 * Mm2) * degree),
            A88 = 0.0001 * sin((D + 40 * Mm2) * degree),
            A89 = 0.0001 * sin((D - 41 * Mm2) * degree),
            A90 = 0.0001 * sin((D + 41 * Mm2) * degree),
            A91 = 0.0001 * sin((D - 42 * Mm2) * degree),
            A92 = 0.0001 * sin((D + 42 * Mm2) * degree),
            A93 = 0.0001 * sin((D - 43 * Mm2) * degree),
            A94 = 0.0001 * sin((D + 43 * Mm2) * degree),
            A95 = 0.0001 * sin((D - 44 * Mm2) * degree),
            A96 = 0.0001 * sin((D + 44 * Mm2) * degree),
            A97 = 0.0001 * sin((D - 45 * Mm2) * degree),
            A98 = 0.0001 * sin((D + 45 * Mm2) * degree),
            A99 = 0.0001 * sin((D - 46 * Mm2) * degree),
            A100 = 0.0001 * sin((D + 46 * Mm2) * degree),
            L = Lm + Ec + A1 + A2 + A3 + A4 + A5 + A6 + A7 + A8 + A9 + A10 + A11 + A12 + A13 + A14 + A15 + A16 + A17 + A18 + A19 + A20 + A21 + A22 + A23 + A24 + A25 + A26 + A27 + A28 + A29 + A30 + A31 + A32 + A33 + A34 + A35 + A36 + A37 + A38 + A39 + A40 + A41 + A42 + A43 + A44 + A45 + A46 + A47 + A48 + A49 + A50 + A51 + A52 + A53 + A54 + A55 + A56 + A57 + A58 + A59 + A60 + A61 + A62 + A63 + A64 + A65 + A66 + A67 + A68 + A69 + A70 + A71 + A72 + A73 + A74 + A75 + A76 + A77 + A78 + A79 + A80 + A81 + A82 + A83 + A84 + A85 + A86 + A87 + A88 + A89 + A90 + A91 + A92 + A93 + A94 + A95 + A96 + A97 + A98 + A99 + A100,
            B = 0.0023 * sin(2 * D * degree) + 0.0023 * sin((D + Mm2) * degree) + 0.0023 * sin((D - Mm2) * degree),
            R = 384400 * (1 - 0.0549 * cos(Mm2 * degree) - 0.00033 * cos(2 * D * degree) - 0.00021 * cos(2 * (D - Mm2) * degree)),
            deltaPsi = -0.00031737 * sin(13.72 * degree) * sin(0.0172 * n) +
                       -0.00003637 * sin(13.72 * degree) * sin(0.0344 * n) +
                       0.00000046 * sin(13.72 * degree) * sin(0.0516 * n),
            epsilon = 23.439291 - 0.0130042 * n / 36525 - 1.64e-7 * n * n / 36525 + 5.04e-7 * n * n * n / 36525 - 5.57e-10 * n * n * n * n / 36525,
            ra = atan2(cos(epsilon * degree) * sin(L * degree), cos(L * degree)) / degree,
            dec = asin(sin(epsilon * degree) * sin(L * degree)) / degree,
            sidereal = (280.46061837 + 360.98564736629 * (d.getTime() / 86400000 - 0.5) + 0.000387933 * n * n - n * n * n / 38710000) % 360,
            ha = (sidereal - lng - ra + 360) % 360,
            el = asin(sin(dec * degree) * sin(lat * degree) + cos(dec * degree) * cos(lat * degree) * cos(ha * degree)) / degree,
            az = atan2(-cos(dec * degree) * sin(ha * degree), sin(dec * degree) * cos(lat * degree) - cos(dec * degree) * sin(lat * degree) * cos(ha * degree)) / degree + 180;

        // adjust for atmospheric refraction
        if (el > 0) {
            var refraction = 0.0167 / tan((el + 7.31 / (el + 4.4)) * degree);
            el += refraction;
        }

        // adjust for observer's elevation
        if (elevation > 0) {
            var horizon = -2.076 * sqrt(elevation) / 60;
            el += horizon;
        }

        return {
            azimuth: (az + 360) % 360,
            altitude: el,
            distance: R
        };
    }

    // calculates sun times for a given date and observer's position
    function getSunTimes(date, lat, lng, height) {
        var d = new Date(date),
            J2000 = (d - new Date('2000-01-01T12:00:00Z')) / 86400000,
            n = J2000 + 2451545 - 2451545,
            M = (357.5291 + 0.98560028 * n) % 360,
            L0 = (280.46 + 0.9856474 * n) % 360,
            C = (1.9146 - 0.004817 * n - 0.000014 * n * n) * sin(M * degree) +
                (0.019993 - 0.000101 * n) * sin(2 * M * degree) +
                0.000289 * sin(3 * M * degree),
            L = (L0 + C) % 360,
            deltaPsi = -0.00031737 * sin(13.72 * degree) * sin(0.0172 * n) +
                       -0.00003637 * sin(13.72 * degree) * sin(0.0344 * n) +
                       0.00000046 * sin(13.72 * degree) * sin(0.0516 * n),
            epsilon = 23.439291 - 0.0130042 * n / 36525 - 1.64e-7 * n * n / 36525 + 5.04e-7 * n * n * n / 36525 - 5.57e-10 * n * n * n * n / 36525,
            ra = atan2(cos(epsilon * degree) * sin(L * degree), cos(L * degree)) / degree,
            dec = asin(sin(epsilon * degree) * sin(L * degree)) / degree,
            sidereal = (280.46061837 + 360.98564736629 * (d.getTime() / 86400000 - 0.5) + 0.000387933 * n * n - n * n * n / 38710000) % 360,
            ha = (sidereal - lng - ra + 360) % 360,
            el = asin(sin(dec * degree) * sin(lat * degree) + cos(dec * degree) * cos(lat * degree) * cos(ha * degree)) / degree,
            az = atan2(-cos(dec * degree) * sin(ha * degree), sin(dec * degree) * cos(lat * degree) - cos(dec * degree) * sin(lat * degree) * cos(ha * degree)) / degree + 180;

        // adjust for atmospheric refraction
        if (el > 0) {
            var refraction = 0.0167 / tan((el + 7.31 / (el + 4.4)) * degree);
            el += refraction;
        }

        // adjust for observer's elevation
        if (height > 0) {
            var horizon = -2.076 * sqrt(height) / 60;
            el += horizon;
        }

        // calculate sun times
        var times = {},
            solarNoon = (720 - 4 * lng - eqTime + 0 * 60) / 1440,
            sunrise = solarNoon - ha / 360,
            sunset = solarNoon + ha / 360;

        times.solarNoon = new Date(d);
        times.solarNoon.setHours(12 + solarNoon * 24, (solarNoon * 24 - Math.floor(solarNoon * 24)) * 60, 0, 0);

        times.sunrise = new Date(d);
        times.sunrise.setHours(12 + sunrise * 24, (sunrise * 24 - Math.floor(sunrise * 24)) * 60, 0, 0);

        times.sunset = new Date(d);
        times.sunset.setHours(12 + sunset * 24, (sunset * 24 - Math.floor(sunset * 24)) * 60, 0, 0);

        return times;
    }

    // calculates moon times for a given date and observer's position
    function getMoonTimes(date, lat, lng, height) {
        var d = new Date(date),
            J2000 = (d - new Date('2000-01-01T12:00:00Z')) / 86400000,
            n = J2000 + 2451545 - 2451545,
            Ls = (280.46 + 0.9856474 * n) % 360,
            Lm = (218.3165 + 13.17639648 * n) % 360,
            D = (297.8502 + 12.199708 * n) % 360,
            F = (93.2721 + 13.064993 * n) % 360,
            Mm = (357.5291 + 0.98560028 * n) % 360,
            Mm2 = (134.9634 + 13.063209 * n) % 360,
            Ec = 1.2739 * sin((2 * D - Mm2) * degree),
            A1 = 0.6583 * sin(2 * D * degree),
            A2 = 0.1858 * sin(Mm * degree),
            A3 = 0.0291 * sin(2 * F * degree),
            A4 = 0.0148 * sin(2 * (D - Mm2) * degree),
            A5 = 0.0093 * sin(2 * (D - Mm) * degree),
            A6 = 0.0077 * sin((D - Mm2) * degree),
            A7 = 0.0050 * sin((D - 2 * Mm2) * degree),
            A8 = 0.0045 * sin((D + Mm2) * degree),
            A9 = 0.0044 * sin((D - 3 * Mm2) * degree),
            A10 = 0.0044 * sin((D + Mm) * degree),
            A11 = 0.0035 * sin((D - 2 * Mm) * degree),
            A12 = 0.0031 * sin((D + 2 * Mm2) * degree),
            A13 = 0.0028 * sin((D - 4 * Mm2) * degree),
            A14 = 0.0025 * sin((D + 3 * Mm2) * degree),
            A15 = 0.0023 * sin((D - 5 * Mm2) * degree),
            A16 = 0.0020 * sin((D + 4 * Mm2) * degree),
            A17 = 0.0019 * sin((D - Mm) * degree),
            A18 = 0.0017 * sin((D + 5 * Mm2) * degree),
            A19 = 0.0016 * sin((D - 6 * Mm2) * degree),
            A20 = 0.0015 * sin((D + 6 * Mm2) * degree),
            A21 = 0.0014 * sin((D - 7 * Mm2) * degree),
            A22 = 0.0013 * sin((D + 7 * Mm2) * degree),
            A23 = 0.0012 * sin((D - 8 * Mm2) * degree),
            A24 = 0.0011 * sin((D + 8 * Mm2) * degree),
            A25 = 0.0010 * sin((D - 9 * Mm2) * degree),
            A26 = 0.0010 * sin((D + 9 * Mm2) * degree),
            A27 = 0.0009 * sin((D - 10 * Mm2) * degree),
            A28 = 0.0008 * sin((D + 10 * Mm2) * degree),
            A29 = 0.0007 * sin((D - 11 * Mm2) * degree),
            A30 = 0.0007 * sin((D + 11 * Mm2) * degree),
            A31 = 0.0006 * sin((D - 12 * Mm2) * degree),
            A32 = 0.0006 * sin((D + 12 * Mm2) * degree),
            A33 = 0.0005 * sin((D - 13 * Mm2) * degree),
            A34 = 0.0005 * sin((D + 13 * Mm2) * degree),
            A35 = 0.0004 * sin((D - 14 * Mm2) * degree),
            A36 = 0.0004 * sin((D + 14 * Mm2) * degree),
            A37 = 0.0003 * sin((D - 15 * Mm2) * degree),
            A38 = 0.0003 * sin((D + 15 * Mm2) * degree),
            A39 = 0.0002 * sin((D - 16 * Mm2) * degree),
            A40 = 0.0002 * sin((D + 16 * Mm2) * degree),
            A41 = 0.0002 * sin((D - 17 * Mm2) * degree),
            A42 = 0.0002 * sin((D + 17 * Mm2) * degree),
            A43 = 0.0001 * sin((D - 18 * Mm2) * degree),
            A44 = 0.0001 * sin((D + 18 * Mm2) * degree),
            A45 = 0.0001 * sin((D - 19 * Mm2) * degree),
            A46 = 0.0001 * sin((D + 19 * Mm2) * degree),
            A47 = 0.0001 * sin((D - 20 * Mm2) * degree),
            A48 = 0.0001 * sin((D + 20 * Mm2) * degree),
            A49 = 0.0001 * sin((D - 21 * Mm2) * degree),
            A50 = 0.0001 * sin((D + 21 * Mm2) * degree),
            A51 = 0.0001 * sin((D - 22 * Mm2) * degree),
            A52 = 0.0001 * sin((D + 22 * Mm2) * degree),
            A53 = 0.0001 * sin((D - 23 * Mm2) * degree),
            A54 = 0.0001 * sin((D + 23 * Mm2) * degree),
            A55 = 0.0001 * sin((D - 24 * Mm2) * degree),
            A56 = 0.0001 * sin((D + 24 * Mm2) * degree),
            A57 = 0.0001 * sin((D - 25 * Mm2) * degree),
            A58 = 0.0001 * sin((D + 25 * Mm2) * degree),
            A59 = 0.0001 * sin((D - 26 * Mm2) * degree),
            A60 = 0.0001 * sin((D + 26 * Mm2) * degree),
            A61 = 0.0001 * sin((D - 27 * Mm2) * degree),
            A62 = 0.0001 * sin((D + 27 * Mm2) * degree),
            A63 = 0.0001 * sin((D - 28 * Mm2) * degree),
            A64 = 0.0001 * sin((D + 28 * Mm2) * degree),
            A65 = 0.0001 * sin((D - 29 * Mm2) * degree),
            A66 = 0.0001 * sin((D + 29 * Mm2) * degree),
            A67 = 0.0001 * sin((D - 30 * Mm2) * degree),
            A68 = 0.0001 * sin((D + 30 * Mm2) * degree),
            A69 = 0.0001 * sin((D - 31 * Mm2) * degree),
            A70 = 0.0001 * sin((D + 31 * Mm2) * degree),
            A71 = 0.0001 * sin((D - 32 * Mm2) * degree),
            A72 = 0.0001 * sin((D + 32 * Mm2) * degree),
            A73 = 0.0001 * sin((D - 33 * Mm2) * degree),
            A74 = 0.0001 * sin((D + 33 * Mm2) * degree),
            A75 = 0.0001 * sin((D - 34 * Mm2) * degree),
            A76 = 0.0001 * sin((D + 34 * Mm2) * degree),
            A77 = 0.0001 * sin((D - 35 * Mm2) * degree),
            A78 = 0.0001 * sin((D + 35 * Mm2) * degree),
            A79 = 0.0001 * sin((D - 36 * Mm2) * degree),
            A80 = 0.0001 * sin((D + 36 * Mm2) * degree),
            A81 = 0.0001 * sin((D - 37 * Mm2) * degree),
            A82 = 0.0001 * sin((D + 37 * Mm2) * degree),
            A83 = 0.0001 * sin((D - 38 * Mm2) * degree),
            A84 = 0.0001 * sin((D + 38 * Mm2) * degree),
            A85 = 0.0001 * sin((D - 39 * Mm2) * degree),
            A86 = 0.0001 * sin((D + 39 * Mm2) * degree),
            A87 = 0.0001 * sin((D - 40 * Mm2) * degree),
            A88 = 0.0001 * sin((D + 40 * Mm2) * degree),
            A89 = 0.0001 * sin((D - 41 * Mm2) * degree),
            A90 = 0.0001 * sin((D + 41 * Mm2) * degree),
            A91 = 0.0001 * sin((D - 42 * Mm2) * degree),
            A92 = 0.0001 * sin((D + 42 * Mm2) * degree),
            A93 = 0.0001 * sin((D - 43 * Mm2) * degree),
            A94 = 0.0001 * sin((D + 43 * Mm2) * degree),
            A95 = 0.0001 * sin((D - 44 * Mm2) * degree),
            A96 = 0.0001 * sin((D + 44 * Mm2) * degree),
            A97 = 0.0001 * sin((D - 45 * Mm2) * degree),
            A98 = 0.0001 * sin((D + 45 * Mm2) * degree),
            A99 = 0.0001 * sin((D - 46 * Mm2) * degree),
            A100 = 0.0001 * sin((D + 46 * Mm2) * degree),
            L = Lm + Ec + A1 + A2 + A3 + A4 + A5 + A6 + A7 + A8 + A9 + A10 + A11 + A12 + A13 + A14 + A15 + A16 + A17 + A18 + A19 + A20 + A21 + A22 + A23 + A24 + A25 + A26 + A27 + A28 + A29 + A30 + A31 + A32 + A33 + A34 + A35 + A36 + A37 + A38 + A39 + A40 + A41 + A42 + A43 + A44 + A45 + A46 + A47 + A48 + A49 + A50 + A51 + A52 + A53 + A54 + A55 + A56 + A57 + A58 + A59 + A60 + A61 + A62 + A63 + A64 + A65 + A66 + A67 + A68 + A69 + A70 + A71 + A72 + A73 + A74 + A75 + A76 + A77 + A78 + A79 + A80 + A81 + A82 + A83 + A84 + A85 + A86 + A87 + A88 + A89 + A90 + A91 + A92 + A93 + A94 + A95 + A96 + A97 + A98 + A99 + A100,
            B = 0.0023 * sin(2 * D * degree) + 0.0023 * sin((D + Mm2) * degree) + 0.0023 * sin((D - Mm2) * degree),
            R = 384400 * (1 - 0.0549 * cos(Mm2 * degree) - 0.00033 * cos(2 * D * degree) - 0.00021 * cos(2 * (D - Mm2) * degree)),
            deltaPsi = -0.00031737 * sin(13.72 * degree) * sin(0.0172 * n) +
                       -0.00003637 * sin(13.72 * degree) * sin(0.0344 * n) +
                       0.00000046 * sin(13.72 * degree) * sin(0.0516 * n),
            epsilon = 23.439291 - 0.0130042 * n / 36525 - 1.64e-7 * n * n / 36525 + 5.04e-7 * n * n * n / 36525 - 5.57e-10 * n * n * n * n / 36525,
            ra = atan2(cos(epsilon * degree) * sin(L * degree), cos(L * degree)) / degree,
            dec = asin(sin(epsilon * degree) * sin(L * degree)) / degree,
            sidereal = (280.46061837 + 360.98564736629 * (d.getTime() / 86400000 - 0.5) + 0.000387933 * n * n - n * n * n / 38710000) % 360,
            ha = (sidereal - lng - ra + 360) % 360,
            el = asin(sin(dec * degree) * sin(lat * degree) + cos(dec * degree) * cos(lat * degree) * cos(ha * degree)) / degree,
            az = atan2(-cos(dec * degree) * sin(ha * degree), sin(dec * degree) * cos(lat * degree) - cos(dec * degree) * sin(lat * degree) * cos(ha * degree)) / degree + 180;

        // adjust for atmospheric refraction
        if (el > 0) {
            var refraction = 0.0167 / tan((el + 7.31 / (el + 4.4)) * degree);
            el += refraction;
        }

        // adjust for observer's elevation
        if (height > 0) {
            var horizon = -2.076 * sqrt(height) / 60;
            el += horizon;
        }

        // calculate moon times
        var times = {},
            lunarNoon = (720 - 4 * lng - eqTime + 0 * 60) / 1440,
            moonrise = lunarNoon - ha / 360,
            moonset = lunarNoon + ha / 360;

        times.lunarNoon = new Date(d);
        times.lunarNoon.setHours(12 + lunarNoon * 24, (lunarNoon * 24 - Math.floor(lunarNoon * 24)) * 60, 0, 0);

        times.moonrise = new Date(d);
        times.moonrise.setHours(12 + moonrise * 24, (moonrise * 24 - Math.floor(moonrise * 24)) * 60, 0, 0);

        times.moonset = new Date(d);
        times.moonset.setHours(12 + moonset * 24, (moonset * 24 - Math.floor(moonset * 24)) * 60, 0, 0);

        return times;
    }

    // export as AMD module / Node module / browser variable
    return {
        getSunPosition: getSunPosition,
        getMoonPosition: getMoonPosition,
        getSunTimes: getSunTimes,
        getMoonTimes: getMoonTimes
    };
}));
