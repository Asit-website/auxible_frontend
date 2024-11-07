import AdminNavbar from "../../admin/Navbar/AdminNavbar";
import AdminSidebar from "../../admin/Sidebar/AdminSidebar";
import "react-calendar/dist/Calendar.css";
import { useMain } from "../../../hooks/useMain";
import "./HRMsystem.css";
import EmployeeSidebar from "../../Employee/Sidebar/EmployeeSidebar";
import EmployeeNavbar from "../../Employee/Navbar/EmployeeNavbar";
import plussing from "../../images/plussing.png";
import inputfileds from "../../images/inputfield.png";
import "./quote.css";
import JoditEditor from "jodit-react";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import { useReactToPrint } from "react-to-print";

const data = `<h3 style="box-sizing: border-box; border-width: 0px; border-style: solid; border-color: rgb(229, 231, 235); --tw-border-spacing-x: 0; --tw-border-spacing-y: 0; --tw-translate-x: 0; --tw-translate-y: 0; --tw-rotate: 0; --tw-skew-x: 0; --tw-skew-y: 0; --tw-scale-x: 1; --tw-scale-y: 1; --tw-pan-x: ; --tw-pan-y: ; --tw-pinch-zoom: ; --tw-scroll-snap-strictness: proximity; --tw-gradient-from-position: ; --tw-gradient-via-position: ; --tw-gradient-to-position: ; --tw-ordinal: ; --tw-slashed-zero: ; --tw-numeric-figure: ; --tw-numeric-spacing: ; --tw-numeric-fraction: ; --tw-ring-inset: ; --tw-ring-offset-width: 0px; --tw-ring-offset-color: #fff; --tw-ring-color: rgb(59 130 246 / 0.5); --tw-ring-offset-shadow: 0 0 #0000; --tw-ring-shadow: 0 0 #0000; --tw-shadow: 0 0 #0000; --tw-shadow-colored: 0 0 #0000; --tw-blur: ; --tw-brightness: ; --tw-contrast: ; --tw-grayscale: ; --tw-hue-rotate: ; --tw-invert: ; --tw-saturate: ; --tw-sepia: ; --tw-drop-shadow: ; --tw-backdrop-blur: ; --tw-backdrop-brightness: ; --tw-backdrop-contrast: ; --tw-backdrop-grayscale: ; --tw-backdrop-hue-rotate: ; --tw-backdrop-invert: ; --tw-backdrop-opacity: ; --tw-backdrop-saturate: ; --tw-backdrop-sepia: ; --tw-contain-size: ; --tw-contain-layout: ; --tw-contain-paint: ; --tw-contain-style: ; padding: 0px; margin: 0px; font-family: Inter; font-size: 18px; font-weight: 500; line-height: 32px; text-align: left; color: rgb(16, 24, 32); font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; letter-spacing: normal; orphans: 2; text-indent: 0px; text-transform: none; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; white-space: normal; background-color: rgb(255, 255, 255); text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;">User App(android/iOS)</h3><ul class="ulist" style="box-sizing: border-box; border-width: 0px; border-style: solid; border-color: rgb(229, 231, 235); --tw-border-spacing-x: 0; --tw-border-spacing-y: 0; --tw-translate-x: 0; --tw-translate-y: 0; --tw-rotate: 0; --tw-skew-x: 0; --tw-skew-y: 0; --tw-scale-x: 1; --tw-scale-y: 1; --tw-pan-x: ; --tw-pan-y: ; --tw-pinch-zoom: ; --tw-scroll-snap-strictness: proximity; --tw-gradient-from-position: ; --tw-gradient-via-position: ; --tw-gradient-to-position: ; --tw-ordinal: ; --tw-slashed-zero: ; --tw-numeric-figure: ; --tw-numeric-spacing: ; --tw-numeric-fraction: ; --tw-ring-inset: ; --tw-ring-offset-width: 0px; --tw-ring-offset-color: #fff; --tw-ring-color: rgb(59 130 246 / 0.5); --tw-ring-offset-shadow: 0 0 #0000; --tw-ring-shadow: 0 0 #0000; --tw-shadow: 0 0 #0000; --tw-shadow-colored: 0 0 #0000; --tw-blur: ; --tw-brightness: ; --tw-contrast: ; --tw-grayscale: ; --tw-hue-rotate: ; --tw-invert: ; --tw-saturate: ; --tw-sepia: ; --tw-drop-shadow: ; --tw-backdrop-blur: ; --tw-backdrop-brightness: ; --tw-backdrop-contrast: ; --tw-backdrop-grayscale: ; --tw-backdrop-hue-rotate: ; --tw-backdrop-invert: ; --tw-backdrop-opacity: ; --tw-backdrop-saturate: ; --tw-backdrop-sepia: ; --tw-contain-size: ; --tw-contain-layout: ; --tw-contain-paint: ; --tw-contain-style: ; padding: 0px; margin: 0px; font-family: gilroy; list-style: none; color: rgb(0, 0, 0); font-size: medium; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; white-space: normal; background-color: rgb(255, 255, 255); text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;"><li style="box-sizing: border-box; border-width: 0px; border-style: solid; border-color: rgb(229, 231, 235); --tw-border-spacing-x: 0; --tw-border-spacing-y: 0; --tw-translate-x: 0; --tw-translate-y: 0; --tw-rotate: 0; --tw-skew-x: 0; --tw-skew-y: 0; --tw-scale-x: 1; --tw-scale-y: 1; --tw-pan-x: ; --tw-pan-y: ; --tw-pinch-zoom: ; --tw-scroll-snap-strictness: proximity; --tw-gradient-from-position: ; --tw-gradient-via-position: ; --tw-gradient-to-position: ; --tw-ordinal: ; --tw-slashed-zero: ; --tw-numeric-figure: ; --tw-numeric-spacing: ; --tw-numeric-fraction: ; --tw-ring-inset: ; --tw-ring-offset-width: 0px; --tw-ring-offset-color: #fff; --tw-ring-color: rgb(59 130 246 / 0.5); --tw-ring-offset-shadow: 0 0 #0000; --tw-ring-shadow: 0 0 #0000; --tw-shadow: 0 0 #0000; --tw-shadow-colored: 0 0 #0000; --tw-blur: ; --tw-brightness: ; --tw-contrast: ; --tw-grayscale: ; --tw-hue-rotate: ; --tw-invert: ; --tw-saturate: ; --tw-sepia: ; --tw-drop-shadow: ; --tw-backdrop-blur: ; --tw-backdrop-brightness: ; --tw-backdrop-contrast: ; --tw-backdrop-grayscale: ; --tw-backdrop-hue-rotate: ; --tw-backdrop-invert: ; --tw-backdrop-opacity: ; --tw-backdrop-saturate: ; --tw-backdrop-sepia: ; --tw-contain-size: ; --tw-contain-layout: ; --tw-contain-paint: ; --tw-contain-style: ; padding: 0px; margin: 0px; font-family: Inter; font-size: 18px; font-weight: 500; line-height: 32px; text-align: left; color: rgb(16, 24, 32);">Login with</li></ul><ol class="ollist" style="box-sizing: border-box; border-width: 0px; border-style: solid; border-color: rgb(229, 231, 235); --tw-border-spacing-x: 0; --tw-border-spacing-y: 0; --tw-translate-x: 0; --tw-translate-y: 0; --tw-rotate: 0; --tw-skew-x: 0; --tw-skew-y: 0; --tw-scale-x: 1; --tw-scale-y: 1; --tw-pan-x: ; --tw-pan-y: ; --tw-pinch-zoom: ; --tw-scroll-snap-strictness: proximity; --tw-gradient-from-position: ; --tw-gradient-via-position: ; --tw-gradient-to-position: ; --tw-ordinal: ; --tw-slashed-zero: ; --tw-numeric-figure: ; --tw-numeric-spacing: ; --tw-numeric-fraction: ; --tw-ring-inset: ; --tw-ring-offset-width: 0px; --tw-ring-offset-color: #fff; --tw-ring-color: rgb(59 130 246 / 0.5); --tw-ring-offset-shadow: 0 0 #0000; --tw-ring-shadow: 0 0 #0000; --tw-shadow: 0 0 #0000; --tw-shadow-colored: 0 0 #0000; --tw-blur: ; --tw-brightness: ; --tw-contrast: ; --tw-grayscale: ; --tw-hue-rotate: ; --tw-invert: ; --tw-saturate: ; --tw-sepia: ; --tw-drop-shadow: ; --tw-backdrop-blur: ; --tw-backdrop-brightness: ; --tw-backdrop-contrast: ; --tw-backdrop-grayscale: ; --tw-backdrop-hue-rotate: ; --tw-backdrop-invert: ; --tw-backdrop-opacity: ; --tw-backdrop-saturate: ; --tw-backdrop-sepia: ; --tw-contain-size: ; --tw-contain-layout: ; --tw-contain-paint: ; --tw-contain-style: ; padding: 0px; margin: 0px; font-family: gilroy; list-style: none; color: rgb(0, 0, 0); font-size: medium; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; white-space: normal; background-color: rgb(255, 255, 255); text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;"><li style="box-sizing: border-box; border-width: 0px; border-style: solid; border-color: rgb(229, 231, 235); --tw-border-spacing-x: 0; --tw-border-spacing-y: 0; --tw-translate-x: 0; --tw-translate-y: 0; --tw-rotate: 0; --tw-skew-x: 0; --tw-skew-y: 0; --tw-scale-x: 1; --tw-scale-y: 1; --tw-pan-x: ; --tw-pan-y: ; --tw-pinch-zoom: ; --tw-scroll-snap-strictness: proximity; --tw-gradient-from-position: ; --tw-gradient-via-position: ; --tw-gradient-to-position: ; --tw-ordinal: ; --tw-slashed-zero: ; --tw-numeric-figure: ; --tw-numeric-spacing: ; --tw-numeric-fraction: ; --tw-ring-inset: ; --tw-ring-offset-width: 0px; --tw-ring-offset-color: #fff; --tw-ring-color: rgb(59 130 246 / 0.5); --tw-ring-offset-shadow: 0 0 #0000; --tw-ring-shadow: 0 0 #0000; --tw-shadow: 0 0 #0000; --tw-shadow-colored: 0 0 #0000; --tw-blur: ; --tw-brightness: ; --tw-contrast: ; --tw-grayscale: ; --tw-hue-rotate: ; --tw-invert: ; --tw-saturate: ; --tw-sepia: ; --tw-drop-shadow: ; --tw-backdrop-blur: ; --tw-backdrop-brightness: ; --tw-backdrop-contrast: ; --tw-backdrop-grayscale: ; --tw-backdrop-hue-rotate: ; --tw-backdrop-invert: ; --tw-backdrop-opacity: ; --tw-backdrop-saturate: ; --tw-backdrop-sepia: ; --tw-contain-size: ; --tw-contain-layout: ; --tw-contain-paint: ; --tw-contain-style: ; padding: 0px; margin: 0px; font-family: Inter; font-size: 18px; font-weight: 400; line-height: 32px; text-align: left; color: rgb(16, 24, 32);">1. Email address</li><li style="box-sizing: border-box; border-width: 0px; border-style: solid; border-color: rgb(229, 231, 235); --tw-border-spacing-x: 0; --tw-border-spacing-y: 0; --tw-translate-x: 0; --tw-translate-y: 0; --tw-rotate: 0; --tw-skew-x: 0; --tw-skew-y: 0; --tw-scale-x: 1; --tw-scale-y: 1; --tw-pan-x: ; --tw-pan-y: ; --tw-pinch-zoom: ; --tw-scroll-snap-strictness: proximity; --tw-gradient-from-position: ; --tw-gradient-via-position: ; --tw-gradient-to-position: ; --tw-ordinal: ; --tw-slashed-zero: ; --tw-numeric-figure: ; --tw-numeric-spacing: ; --tw-numeric-fraction: ; --tw-ring-inset: ; --tw-ring-offset-width: 0px; --tw-ring-offset-color: #fff; --tw-ring-color: rgb(59 130 246 / 0.5); --tw-ring-offset-shadow: 0 0 #0000; --tw-ring-shadow: 0 0 #0000; --tw-shadow: 0 0 #0000; --tw-shadow-colored: 0 0 #0000; --tw-blur: ; --tw-brightness: ; --tw-contrast: ; --tw-grayscale: ; --tw-hue-rotate: ; --tw-invert: ; --tw-saturate: ; --tw-sepia: ; --tw-drop-shadow: ; --tw-backdrop-blur: ; --tw-backdrop-brightness: ; --tw-backdrop-contrast: ; --tw-backdrop-grayscale: ; --tw-backdrop-hue-rotate: ; --tw-backdrop-invert: ; --tw-backdrop-opacity: ; --tw-backdrop-saturate: ; --tw-backdrop-sepia: ; --tw-contain-size: ; --tw-contain-layout: ; --tw-contain-paint: ; --tw-contain-style: ; padding: 0px; margin: 0px; font-family: Inter; font-size: 18px; font-weight: 400; line-height: 32px; text-align: left; color: rgb(16, 24, 32);">2. Password</li></ol><ul class="ulist" style="box-sizing: border-box; border-width: 0px; border-style: solid; border-color: rgb(229, 231, 235); --tw-border-spacing-x: 0; --tw-border-spacing-y: 0; --tw-translate-x: 0; --tw-translate-y: 0; --tw-rotate: 0; --tw-skew-x: 0; --tw-skew-y: 0; --tw-scale-x: 1; --tw-scale-y: 1; --tw-pan-x: ; --tw-pan-y: ; --tw-pinch-zoom: ; --tw-scroll-snap-strictness: proximity; --tw-gradient-from-position: ; --tw-gradient-via-position: ; --tw-gradient-to-position: ; --tw-ordinal: ; --tw-slashed-zero: ; --tw-numeric-figure: ; --tw-numeric-spacing: ; --tw-numeric-fraction: ; --tw-ring-inset: ; --tw-ring-offset-width: 0px; --tw-ring-offset-color: #fff; --tw-ring-color: rgb(59 130 246 / 0.5); --tw-ring-offset-shadow: 0 0 #0000; --tw-ring-shadow: 0 0 #0000; --tw-shadow: 0 0 #0000; --tw-shadow-colored: 0 0 #0000; --tw-blur: ; --tw-brightness: ; --tw-contrast: ; --tw-grayscale: ; --tw-hue-rotate: ; --tw-invert: ; --tw-saturate: ; --tw-sepia: ; --tw-drop-shadow: ; --tw-backdrop-blur: ; --tw-backdrop-brightness: ; --tw-backdrop-contrast: ; --tw-backdrop-grayscale: ; --tw-backdrop-hue-rotate: ; --tw-backdrop-invert: ; --tw-backdrop-opacity: ; --tw-backdrop-saturate: ; --tw-backdrop-sepia: ; --tw-contain-size: ; --tw-contain-layout: ; --tw-contain-paint: ; --tw-contain-style: ; padding: 0px; margin: 0px; font-family: gilroy; list-style: none; color: rgb(0, 0, 0); font-size: medium; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; white-space: normal; background-color: rgb(255, 255, 255); text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;"><li style="box-sizing: border-box; border-width: 0px; border-style: solid; border-color: rgb(229, 231, 235); --tw-border-spacing-x: 0; --tw-border-spacing-y: 0; --tw-translate-x: 0; --tw-translate-y: 0; --tw-rotate: 0; --tw-skew-x: 0; --tw-skew-y: 0; --tw-scale-x: 1; --tw-scale-y: 1; --tw-pan-x: ; --tw-pan-y: ; --tw-pinch-zoom: ; --tw-scroll-snap-strictness: proximity; --tw-gradient-from-position: ; --tw-gradient-via-position: ; --tw-gradient-to-position: ; --tw-ordinal: ; --tw-slashed-zero: ; --tw-numeric-figure: ; --tw-numeric-spacing: ; --tw-numeric-fraction: ; --tw-ring-inset: ; --tw-ring-offset-width: 0px; --tw-ring-offset-color: #fff; --tw-ring-color: rgb(59 130 246 / 0.5); --tw-ring-offset-shadow: 0 0 #0000; --tw-ring-shadow: 0 0 #0000; --tw-shadow: 0 0 #0000; --tw-shadow-colored: 0 0 #0000; --tw-blur: ; --tw-brightness: ; --tw-contrast: ; --tw-grayscale: ; --tw-hue-rotate: ; --tw-invert: ; --tw-saturate: ; --tw-sepia: ; --tw-drop-shadow: ; --tw-backdrop-blur: ; --tw-backdrop-brightness: ; --tw-backdrop-contrast: ; --tw-backdrop-grayscale: ; --tw-backdrop-hue-rotate: ; --tw-backdrop-invert: ; --tw-backdrop-opacity: ; --tw-backdrop-saturate: ; --tw-backdrop-sepia: ; --tw-contain-size: ; --tw-contain-layout: ; --tw-contain-paint: ; --tw-contain-style: ; padding: 0px; margin: 0px; font-family: Inter; font-size: 18px; font-weight: 500; line-height: 32px; text-align: left; color: rgb(16, 24, 32);">Sign Up</li></ul><ol class="ollist" style="box-sizing: border-box; border-width: 0px; border-style: solid; border-color: rgb(229, 231, 235); --tw-border-spacing-x: 0; --tw-border-spacing-y: 0; --tw-translate-x: 0; --tw-translate-y: 0; --tw-rotate: 0; --tw-skew-x: 0; --tw-skew-y: 0; --tw-scale-x: 1; --tw-scale-y: 1; --tw-pan-x: ; --tw-pan-y: ; --tw-pinch-zoom: ; --tw-scroll-snap-strictness: proximity; --tw-gradient-from-position: ; --tw-gradient-via-position: ; --tw-gradient-to-position: ; --tw-ordinal: ; --tw-slashed-zero: ; --tw-numeric-figure: ; --tw-numeric-spacing: ; --tw-numeric-fraction: ; --tw-ring-inset: ; --tw-ring-offset-width: 0px; --tw-ring-offset-color: #fff; --tw-ring-color: rgb(59 130 246 / 0.5); --tw-ring-offset-shadow: 0 0 #0000; --tw-ring-shadow: 0 0 #0000; --tw-shadow: 0 0 #0000; --tw-shadow-colored: 0 0 #0000; --tw-blur: ; --tw-brightness: ; --tw-contrast: ; --tw-grayscale: ; --tw-hue-rotate: ; --tw-invert: ; --tw-saturate: ; --tw-sepia: ; --tw-drop-shadow: ; --tw-backdrop-blur: ; --tw-backdrop-brightness: ; --tw-backdrop-contrast: ; --tw-backdrop-grayscale: ; --tw-backdrop-hue-rotate: ; --tw-backdrop-invert: ; --tw-backdrop-opacity: ; --tw-backdrop-saturate: ; --tw-backdrop-sepia: ; --tw-contain-size: ; --tw-contain-layout: ; --tw-contain-paint: ; --tw-contain-style: ; padding: 0px; margin: 0px; font-family: gilroy; list-style: none; color: rgb(0, 0, 0); font-size: medium; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; white-space: normal; background-color: rgb(255, 255, 255); text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;"><li style="box-sizing: border-box; border-width: 0px; border-style: solid; border-color: rgb(229, 231, 235); --tw-border-spacing-x: 0; --tw-border-spacing-y: 0; --tw-translate-x: 0; --tw-translate-y: 0; --tw-rotate: 0; --tw-skew-x: 0; --tw-skew-y: 0; --tw-scale-x: 1; --tw-scale-y: 1; --tw-pan-x: ; --tw-pan-y: ; --tw-pinch-zoom: ; --tw-scroll-snap-strictness: proximity; --tw-gradient-from-position: ; --tw-gradient-via-position: ; --tw-gradient-to-position: ; --tw-ordinal: ; --tw-slashed-zero: ; --tw-numeric-figure: ; --tw-numeric-spacing: ; --tw-numeric-fraction: ; --tw-ring-inset: ; --tw-ring-offset-width: 0px; --tw-ring-offset-color: #fff; --tw-ring-color: rgb(59 130 246 / 0.5); --tw-ring-offset-shadow: 0 0 #0000; --tw-ring-shadow: 0 0 #0000; --tw-shadow: 0 0 #0000; --tw-shadow-colored: 0 0 #0000; --tw-blur: ; --tw-brightness: ; --tw-contrast: ; --tw-grayscale: ; --tw-hue-rotate: ; --tw-invert: ; --tw-saturate: ; --tw-sepia: ; --tw-drop-shadow: ; --tw-backdrop-blur: ; --tw-backdrop-brightness: ; --tw-backdrop-contrast: ; --tw-backdrop-grayscale: ; --tw-backdrop-hue-rotate: ; --tw-backdrop-invert: ; --tw-backdrop-opacity: ; --tw-backdrop-saturate: ; --tw-backdrop-sepia: ; --tw-contain-size: ; --tw-contain-layout: ; --tw-contain-paint: ; --tw-contain-style: ; padding: 0px; margin: 0px; font-family: Inter; font-size: 18px; font-weight: 400; line-height: 32px; text-align: left; color: rgb(16, 24, 32);"><span style="box-sizing: border-box; border-width: 0px; border-style: solid; border-color: rgb(229, 231, 235); --tw-border-spacing-x: 0; --tw-border-spacing-y: 0; --tw-translate-x: 0; --tw-translate-y: 0; --tw-rotate: 0; --tw-skew-x: 0; --tw-skew-y: 0; --tw-scale-x: 1; --tw-scale-y: 1; --tw-pan-x: ; --tw-pan-y: ; --tw-pinch-zoom: ; --tw-scroll-snap-strictness: proximity; --tw-gradient-from-position: ; --tw-gradient-via-position: ; --tw-gradient-to-position: ; --tw-ordinal: ; --tw-slashed-zero: ; --tw-numeric-figure: ; --tw-numeric-spacing: ; --tw-numeric-fraction: ; --tw-ring-inset: ; --tw-ring-offset-width: 0px; --tw-ring-offset-color: #fff; --tw-ring-color: rgb(59 130 246 / 0.5); --tw-ring-offset-shadow: 0 0 #0000; --tw-ring-shadow: 0 0 #0000; --tw-shadow: 0 0 #0000; --tw-shadow-colored: 0 0 #0000; --tw-blur: ; --tw-brightness: ; --tw-contrast: ; --tw-grayscale: ; --tw-hue-rotate: ; --tw-invert: ; --tw-saturate: ; --tw-sepia: ; --tw-drop-shadow: ; --tw-backdrop-blur: ; --tw-backdrop-brightness: ; --tw-backdrop-contrast: ; --tw-backdrop-grayscale: ; --tw-backdrop-hue-rotate: ; --tw-backdrop-invert: ; --tw-backdrop-opacity: ; --tw-backdrop-saturate: ; --tw-backdrop-sepia: ; --tw-contain-size: ; --tw-contain-layout: ; --tw-contain-paint: ; --tw-contain-style: ; padding: 0px; margin: 0px; font-family: Inter; font-size: 18px; font-weight: 600; line-height: 26px; text-align: left;">Name:</span><span>&nbsp;</span>You’ll likely be asked to enter your first and last name.</li><li style="box-sizing: border-box; border-width: 0px; border-style: solid; border-color: rgb(229, 231, 235); --tw-border-spacing-x: 0; --tw-border-spacing-y: 0; --tw-translate-x: 0; --tw-translate-y: 0; --tw-rotate: 0; --tw-skew-x: 0; --tw-skew-y: 0; --tw-scale-x: 1; --tw-scale-y: 1; --tw-pan-x: ; --tw-pan-y: ; --tw-pinch-zoom: ; --tw-scroll-snap-strictness: proximity; --tw-gradient-from-position: ; --tw-gradient-via-position: ; --tw-gradient-to-position: ; --tw-ordinal: ; --tw-slashed-zero: ; --tw-numeric-figure: ; --tw-numeric-spacing: ; --tw-numeric-fraction: ; --tw-ring-inset: ; --tw-ring-offset-width: 0px; --tw-ring-offset-color: #fff; --tw-ring-color: rgb(59 130 246 / 0.5); --tw-ring-offset-shadow: 0 0 #0000; --tw-ring-shadow: 0 0 #0000; --tw-shadow: 0 0 #0000; --tw-shadow-colored: 0 0 #0000; --tw-blur: ; --tw-brightness: ; --tw-contrast: ; --tw-grayscale: ; --tw-hue-rotate: ; --tw-invert: ; --tw-saturate: ; --tw-sepia: ; --tw-drop-shadow: ; --tw-backdrop-blur: ; --tw-backdrop-brightness: ; --tw-backdrop-contrast: ; --tw-backdrop-grayscale: ; --tw-backdrop-hue-rotate: ; --tw-backdrop-invert: ; --tw-backdrop-opacity: ; --tw-backdrop-saturate: ; --tw-backdrop-sepia: ; --tw-contain-size: ; --tw-contain-layout: ; --tw-contain-paint: ; --tw-contain-style: ; padding: 0px; margin: 0px; font-family: Inter; font-size: 18px; font-weight: 400; line-height: 32px; text-align: left; color: rgb(16, 24, 32);"><span style="box-sizing: border-box; border-width: 0px; border-style: solid; border-color: rgb(229, 231, 235); --tw-border-spacing-x: 0; --tw-border-spacing-y: 0; --tw-translate-x: 0; --tw-translate-y: 0; --tw-rotate: 0; --tw-skew-x: 0; --tw-skew-y: 0; --tw-scale-x: 1; --tw-scale-y: 1; --tw-pan-x: ; --tw-pan-y: ; --tw-pinch-zoom: ; --tw-scroll-snap-strictness: proximity; --tw-gradient-from-position: ; --tw-gradient-via-position: ; --tw-gradient-to-position: ; --tw-ordinal: ; --tw-slashed-zero: ; --tw-numeric-figure: ; --tw-numeric-spacing: ; --tw-numeric-fraction: ; --tw-ring-inset: ; --tw-ring-offset-width: 0px; --tw-ring-offset-color: #fff; --tw-ring-color: rgb(59 130 246 / 0.5); --tw-ring-offset-shadow: 0 0 #0000; --tw-ring-shadow: 0 0 #0000; --tw-shadow: 0 0 #0000; --tw-shadow-colored: 0 0 #0000; --tw-blur: ; --tw-brightness: ; --tw-contrast: ; --tw-grayscale: ; --tw-hue-rotate: ; --tw-invert: ; --tw-saturate: ; --tw-sepia: ; --tw-drop-shadow: ; --tw-backdrop-blur: ; --tw-backdrop-brightness: ; --tw-backdrop-contrast: ; --tw-backdrop-grayscale: ; --tw-backdrop-hue-rotate: ; --tw-backdrop-invert: ; --tw-backdrop-opacity: ; --tw-backdrop-saturate: ; --tw-backdrop-sepia: ; --tw-contain-size: ; --tw-contain-layout: ; --tw-contain-paint: ; --tw-contain-style: ; padding: 0px; margin: 0px; font-family: Inter; font-size: 18px; font-weight: 600; line-height: 26px; text-align: left;">Email address:<span>&nbsp;</span></span>You’ll need to provide a valid email address to create an account.</li></ol>`;

const QuotationForm = ({ setAlert, pop, setPop }) => {
  const {
    user,
    uploadSingleImage,
    postQuotationFormApi,
    updateQuotationFormApi,
  } = useMain();

  let hrms_user = JSON.parse(localStorage.getItem("hrms_user"));

  const location = useLocation();

  const { id, item } = location.state;

  const [formdata, setFormdata] = useState({
    quotationNum: "",
    customerName: "",
    customerReq: "",
    mobileNum: "",
    quotationDate: "",
    validUntil: "",
    customerId: "",
    companyName: "",
    companyAddress: "",
    companyGSTIN: "",
    companyWebsite: "",
  });

  const textChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormdata((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const editor = useRef(null);

  const [content, setContent] = useState(data);


  const { role, } = hrms_user;

  const fileInputRef = useRef(null);

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const [logoImage, setLogoImage] = useState("");

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const formdata2 = new FormData();
      formdata2.append("Image", file);

      const ans = await uploadSingleImage(formdata2);
      if (ans?.status) {
        sessionStorage.setItem("quotationLogoLink", ans?.link);
        toast.success("Successfuly uploaded");
        setLogoImage(ans?.link);
      } else {
        toast.error("Something went wrong , please try again");
      }
    }
  };

  const [rows, setRows] = useState([
    { description: "", quantity: "", price: "", total: "" },
  ]);

  const addRow = () => {
    setRows([...rows, { description: "", quantity: "", price: "", total: "" }]);
  };

  const postQuotationForm = async () => {
    const toastId = toast.loading("Loading...");

    const ans = await postQuotationFormApi({
      ...formdata,
      items: rows,
      userId: hrms_user?._id,
      leadId: id,
      content,
    });

    if (ans?.status) {
      toast.success("Successfuly created");
      setFormdata({
        quotationNum: "",
        customerName: "",
        customerReq: "",
        mobileNum: "",
        quotationDate: "",
        validUntil: "",
        customerId: "",
        companyName: "",
        companyAddress: "",
        companyGSTIN: "",
        companyWebsite: "",
      });

      sessionStorage.removeItem("quotationLogoLink");

      setRows([]);
      setContent(data);
    }
    toast.dismiss(toastId);
  };

  const updateQuotationForm = async () => {
    const toastId = toast.loading("Loading...");

    const ans = await updateQuotationFormApi({
      ...formdata,
      items: rows,
      userId: hrms_user?._id,
      leadId: id,
      content,
      id: item?._id,
    });

    if (ans?.status) {
      toast.success("Successfuly updated");
      setFormdata({
        quotationNum: "",
        customerName: "",
        customerReq: "",
        mobileNum: "",
        quotationDate: "",
        validUntil: "",
        customerId: "",
        companyName: "",
        companyAddress: "",
        companyGSTIN: "",
        companyWebsite: "",
      });

      setRows([]);
      setContent(data);
      sessionStorage.removeItem("quotationLogoLink");
    }
    toast.dismiss(toastId);
  };

  useEffect(() => {
    const quotationLogoLink = sessionStorage.getItem("quotationLogoLink");
    if (quotationLogoLink) {
      setLogoImage(quotationLogoLink);
    }
  }, []);

  useEffect(() => {
    if (item) {
      const {
        quotationNum,
        customerName,
        customerReq,
        mobileNum,
        quotationDate,
        validUntil,
        customerId,
        companyName,
        companyAddress,
        companyGSTIN,
        companyWebsite,
        items,
      } = item;
      setRows(items);
      setFormdata({
        quotationNum,
        customerName,
        customerReq,
        mobileNum,
        quotationDate,
        validUntil,
        customerId,
        companyName,
        companyAddress,
        companyGSTIN,
        companyWebsite,
      });
    }
  }, []);

  const contonentPDF = useRef();

  const generatePdf = useReactToPrint({
    content: () => contonentPDF.current,
    documentTitle: "Quotation",
    parentContainer: {
      "@media print": {
        display: "block",
      },
    },
    onAfterPrint: () => alert("success", "item saved"),
  });

  return (
    <>
      <div className="employee-dash h-full">
        {role === "EMPLOYEE" ? (
          <EmployeeSidebar pop={pop} setPop={setPop} />
        ) : (
          <AdminSidebar pop={pop} setPop={setPop} />
        )}

        <div className="tm">
          {role === "EMPLOYEE" ? (
            <EmployeeNavbar user={user} setAlert={setAlert} />
          ) : (
            <AdminNavbar user={user} setAlert={setAlert} />
          )}

          <div className="em">
            <div className="qutaWrap">
              {/* lefft side  */}

              <div className="qutaLeft">
                <div className="qutLTo">
                  <h2>Quotation Form</h2>
                  {/* <button>
                    <span>Preview</span>
                  </button> */}
                </div>

                <div className="allwhitebg">
                  <form className="qtoform">
                    <label>
                      <p>Quotation No*</p>
                      <input
                        value={formdata.quotationNum}
                        name="quotationNum"
                        onChange={textChangeHandler}
                        type="text"
                        placeholder="#01"
                      />
                    </label>

                    <label>
                      <p>Customer Name*</p>
                      <input
                        value={formdata.customerName}
                        name="customerName"
                        onChange={textChangeHandler}
                        type="text"
                        placeholder="Akash Negi"
                      />
                    </label>

                    <label>
                      <p>Customer Requirement</p>
                      <input
                        type="text"
                        value={formdata.customerReq}
                        name="customerReq"
                        onChange={textChangeHandler}
                        placeholder="Mobile App - diet care app"
                      />
                    </label>

                    <label>
                      <p>Mobile Number*</p>
                      <input
                        value={formdata.mobileNum}
                        name="mobileNum"
                        onChange={textChangeHandler}
                        type="text"
                        placeholder="+918595046368"
                      />
                    </label>

                    <label>
                      <p>Quotation Date*</p>
                      <input
                        value={formdata.quotationDate}
                        name="quotationDate"
                        onChange={textChangeHandler}
                        type="date"
                      />
                    </label>

                    <label>
                      <p>Valid Until*</p>
                      <input
                        value={formdata.validUntil}
                        name="validUntil"
                        onChange={textChangeHandler}
                        type="date"
                      />
                    </label>

                    <label>
                      <p>Customer ID*</p>
                      <input
                        value={formdata.customerId}
                        name="customerId"
                        onChange={textChangeHandler}
                        type="text"
                      />
                    </label>

                    <div className="admorewrap">
                      <div className="admorCont">
                        <img src={plussing} alt="" />
                        <span>Add More Fields</span>
                      </div>

                      <div className="image" onClick={handleImageClick}>
                        <img src={inputfileds} alt="" />
                        <p>Add Business Logo</p>
                        <input
                          type="file"
                          ref={fileInputRef}
                          style={{ display: "none" }}
                          onChange={handleFileChange}
                        />
                      </div>
                    </div>
                  </form>

                  <div class="relative ">
                    <table className="quotablle text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                      <thead className="theadqu">
                        <tr>
                          <th scope="col" className="px-2 py-3">
                            Description
                          </th>
                          <th scope="col" className="px-2 py-3">
                            Quantity
                          </th>
                          <th scope="col" className="px-2 py-3">
                            Price
                          </th>
                          <th scope="col" className="px-2 py-3">
                            Total
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {rows.map((row, index) => (
                          <tr className="bg-white tabletr" key={index}>
                            <td className="px-2 py-4">
                              <input
                                type="text"
                                className="inpu11"
                                value={row.description}
                                onChange={(e) => {
                                  const newRows = [...rows];
                                  newRows[index].description = e.target.value;
                                  setRows(newRows);
                                }}
                              />
                            </td>
                            <td className="px-2 py-4">
                              <input
                                type="number"
                                value={row.quantity}
                                onChange={(e) => {
                                  const newRows = [...rows];
                                  newRows[index].quantity = e.target.value;
                                  setRows(newRows);
                                }}
                              />
                            </td>
                            <td className="px-2 py-4">
                              <input
                                type="number"
                                value={row.price}
                                onChange={(e) => {
                                  const newRows = [...rows];
                                  newRows[index].price = e.target.value;
                                  setRows(newRows);
                                }}
                              />
                            </td>
                            <td className="px-2 py-4">
                              <input
                                type="number"
                                value={row.total}
                                onChange={(e) => {
                                  const newRows = [...rows];
                                  newRows[index].total = e.target.value;
                                  setRows(newRows);
                                }}
                              />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div onClick={addRow} className="admorCont">
                    <img src={plussing} alt="" />
                    <span>Add Item</span>
                  </div>

                  <div className="docuThird">
                    <h3>Format</h3>

                    <hr />

                    <JoditEditor
                      ref={editor}
                      value={content}
                      tabIndex={1}
                      onBlur={(newContent) => setContent(newContent)}
                      onChange={(newContent) => {
                        setContent(newContent);
                      }}
                    />
                  </div>

                  <div className="comapnydetail">
                    <h3 className="comdetail">Company Details</h3>

                    <form className="qtoform">
                      <label>
                        <p>Company Name*</p>
                        <input
                          value={formdata.companyName}
                          name="companyName"
                          onChange={textChangeHandler}
                          type="text"
                          placeholder=""
                        />
                      </label>

                      <label>
                        <p>Company Address*</p>
                        <input
                          value={formdata.companyAddress}
                          name="companyAddress"
                          onChange={textChangeHandler}
                          type="text"
                          placeholder=""
                        />
                      </label>

                      <label>
                        <p>Company GSTIN*</p>
                        <input
                          value={formdata.companyGSTIN}
                          name="companyGSTIN"
                          onChange={textChangeHandler}
                          type="text"
                        />
                      </label>

                      <label>
                        <p>Company Website*</p>
                        <input
                          value={formdata.companyWebsite}
                          name="companyWebsite"
                          onChange={textChangeHandler}
                          type="text"
                        />
                      </label>
                    </form>
                  </div>
                </div>
              </div>

              {/* right side  */}
              <div className="qutaRight">
                <div ref={contonentPDF} className="qutaRightcont">
                  <div className="hdquot">
                    <p>Quotation {formdata?.quotationNum}</p>
                    {/* <img src={kdsquto} alt="" /> */}
                    {logoImage ? <img src={logoImage} alt="Logo" /> : <p></p>}

                    {/* <img src={logoImage} alt="" /> */}
                  </div>

                  <p className="cust">Customer</p>

                  <div className="gridView">
                    <p>{formdata?.customerName}</p>
                    <p>Date: {formdata?.quotationDate}</p>
                    <p>{formdata?.customerReq}</p>
                    <p>Valid Until: {formdata?.validUntil}</p>
                    <p>{formdata?.mobileNum}</p>
                    <p>Customer ID: {formdata?.customerId}</p>
                  </div>

                  {/* talble */}

                  <div className="talbeLike">
                    <div class="relative w-full">
                      <table className="quotablle2 text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="theadqu2">
                          <tr>
                            <th scope="col" className="px-2 py-3">
                              Description
                            </th>
                            <th scope="col" className="px-2 py-3">
                              Quantity
                            </th>
                            <th scope="col" className="px-2 py-3">
                              Price
                            </th>
                            <th scope="col" className="px-2 py-3">
                              Total
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {rows.map((row, index) => (
                            <tr className="bg-white tabletr2" key={index}>
                              <td className="px-2 py-4">{row.description}</td>
                              <td className="px-2 py-4">{row.quantity}</td>
                              <td className="px-2 py-4">{row.price}</td>
                              <td className="px-2 py-4">{row.total}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <hr />

                  <div className="userApp">
                    <div dangerouslySetInnerHTML={{ __html: content }} />
                  </div>

                  <hr />

                  <div className="rigthfot">
                    {/* right side */}
                    <div className="rigthfotleft">
                      <p className="leftfist">{formdata.companyName}</p>
                      <p className="seconle">
                        IT and e-Commerce Development Company
                      </p>
                      <p className="thirleft">
                        <span>GST No. </span> {formdata.companyGSTIN}
                      </p>
                    </div>

                    {/* eleft  */}
                    <div className="rigthfotright">
                      <p>Reach us at</p>
                      <p>{formdata?.companyAddress}</p>
                      <p>+91-9045301702 / +1-585-566-2070</p>
                      <p>{formdata?.companyWebsite}</p>
                    </div>

                    <hr />
                  </div>
                </div>

                <hr />

                <div className="prntBtn">
                  <button
                    onClick={() => {
                      if (item) {
                        updateQuotationForm();
                      } else {
                        postQuotationForm();
                      }
                      generatePdf();
                    }}
                  >
                    <span>Print</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default QuotationForm;
