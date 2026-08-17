import React from "react";
import { cn } from "@/lib/utils";

interface ChakraIconProps {
    id: string; // 'muladhara' | 'svadhisthana' | 'manipura' | 'anahata' | 'vishuddha' | 'ajna' | 'sahasrara'
    className?: string;
}

export const ChakraIcon: React.FC<ChakraIconProps> = ({ id, className }) => {
    const getIcon = (chakraId: string) => {
        switch (chakraId) {
            case "sahasrara": // Mission
                return (
                    <svg viewBox="0 0 40 48" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
                        <path d="M14.5195 14.8097C14.5195 10.6397 18.1095 9.83969 19.8095 7.42969C21.6095 9.94969 25.1095 10.7897 25.0995 14.8097" stroke="currentColor" strokeMiterlimit="10" />
                        <path d="M13.7207 7.68C14.1707 4.11 17.9607 3.27 19.8207 1C21.7707 3.35 25.4307 4.24 25.9107 7.61" stroke="currentColor" strokeMiterlimit="10" />
                        <path d="M29.5703 11.3603C32.6503 9.57027 35.6303 12.0403 38.5503 12.1203C37.8403 15.3103 39.6503 19.0403 36.4703 21.5003" stroke="currentColor" strokeMiterlimit="10" />
                        <path d="M9.71055 11.0699C6.83055 9.86992 4.05055 12.0399 1.31055 12.1199C1.98055 15.1099 0.430547 18.5699 2.85055 21.0099" stroke="currentColor" strokeMiterlimit="10" />
                        <path d="M13.7109 39.6895C14.1209 43.3195 17.9509 44.1495 19.8209 46.4395C21.7809 44.0795 25.4709 43.1895 25.9209 39.7695" stroke="currentColor" strokeMiterlimit="10" />
                        <path d="M29.7305 36.1595C32.7605 37.7795 35.6805 35.3895 38.5505 35.3195C37.8405 32.1295 39.6505 28.3995 36.4705 25.9395" stroke="currentColor" strokeMiterlimit="10" />
                        <path d="M9.68031 36.3697C6.82031 37.5397 4.04031 35.3797 1.32031 35.3097C2.03031 32.1197 0.220312 28.3897 3.40031 25.9297" stroke="currentColor" strokeMiterlimit="10" />
                        <path d="M6.26 28.0309C3.83 27.0609 2.94 24.4809 1 23.1209C3.01 21.6809 3.95 19.1609 6.3 18.2109" stroke="currentColor" strokeMiterlimit="10" />
                        <path d="M33.0703 28.1107C35.6603 27.2107 36.5503 24.5207 38.5403 23.1207C36.5403 21.6907 35.6003 19.1907 33.2803 18.2207" stroke="currentColor" strokeMiterlimit="10" />
                        <path d="M9.0401 14.4101C8.5001 11.6401 10.4801 9.54008 10.7601 7.08008C13.0601 8.19008 15.8301 7.74008 17.8101 9.53008" stroke="currentColor" strokeMiterlimit="10" />
                        <path d="M9.1305 32.6094C8.3205 35.5694 10.4705 37.7394 10.7605 40.3094C13.0505 39.2094 15.8005 39.6494 17.7805 37.8894" stroke="currentColor" strokeMiterlimit="10" />
                        <path d="M30.1295 14.4201C30.6795 11.6501 28.6895 9.55008 28.4095 7.08008C26.2595 8.11008 23.7095 7.79008 21.7695 9.20008" stroke="currentColor" strokeMiterlimit="10" />
                        <path d="M30.1196 32.9199C30.6996 35.7199 28.6896 37.8299 28.4096 40.3099C26.1996 39.2499 23.5596 39.6199 21.5996 38.0599" stroke="currentColor" strokeMiterlimit="10" />
                        <path d="M9.32039 23.7001C5.73039 21.5701 6.87039 18.0801 5.65039 15.3901C8.73039 15.1201 11.2404 12.5401 14.7004 14.5901" stroke="currentColor" strokeMiterlimit="10" />
                        <path d="M9.32039 23.5801C5.73039 25.7101 6.87039 29.2001 5.65039 31.8901C8.73039 32.1601 11.2404 34.7401 14.7004 32.6901" stroke="currentColor" strokeMiterlimit="10" />
                        <path d="M30.4991 23.7001C34.0891 21.5701 32.9491 18.0801 34.1691 15.3901C31.0891 15.1201 28.5791 12.5401 25.1191 14.5901" stroke="currentColor" strokeMiterlimit="10" />
                        <path d="M30.4991 23.5801C34.0891 25.7101 32.9491 29.2001 34.1691 31.8901C31.0891 32.1601 28.5791 34.7401 25.1191 32.6901" stroke="currentColor" strokeMiterlimit="10" />
                        <path d="M14.5195 32.9297C14.5195 37.0997 18.1095 37.8997 19.8095 40.3097C21.6095 37.7897 25.1095 36.9497 25.0995 32.9297" stroke="currentColor" strokeMiterlimit="10" />
                        <path d="M19.8191 33.9291C25.4965 33.9291 30.0991 29.3266 30.0991 23.6491C30.0991 17.9717 25.4965 13.3691 19.8191 13.3691C14.1416 13.3691 9.53906 17.9717 9.53906 23.6491C9.53906 29.3266 14.1416 33.9291 19.8191 33.9291Z" stroke="currentColor" strokeMiterlimit="10" />
                    </svg>
                );
            case "ajna": // Destiny (Third Eye)
                return (
                    <svg viewBox="0 0 51 30" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
                        <path d="M25.4303 28.72C33.085 28.72 39.2903 22.5147 39.2903 14.86C39.2903 7.20533 33.085 1 25.4303 1C17.7756 1 11.5703 7.20533 11.5703 14.86C11.5703 22.5147 17.7756 28.72 25.4303 28.72Z" stroke="currentColor" strokeMiterlimit="10" />
                        <path d="M25.4302 27.8194L36.6202 8.43945H14.2402L25.4302 27.8194Z" stroke="currentColor" strokeMiterlimit="10" />
                        <path d="M17.22 26.0197C8.05 26.0097 6.3 18.4397 1 14.8497C6.53 11.0497 8.39 3.6697 17.22 3.6797" stroke="currentColor" strokeMiterlimit="10" />
                        <path d="M33.4102 26.0197C42.5802 26.0097 44.3302 18.4397 49.6302 14.8497C44.1002 11.0497 42.2402 3.6697 33.4102 3.6797" stroke="currentColor" strokeMiterlimit="10" />
                    </svg>
                );
            case "vishuddha": // Egregores (Throat)
                return (
                    <svg viewBox="0 0 49 49" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
                        <path d="M21.2207 8.76001C21.2207 4.94001 23.3107 4.21 24.3007 2C25.3507 4.3 27.3807 5.08001 27.3807 8.76001" stroke="currentColor" strokeMiterlimit="10" />
                        <path d="M8.76 27.5702C4.94 27.5702 4.21 25.4802 2 24.4902C4.3 23.4402 5.08 21.4102 8.76 21.4102" stroke="currentColor" strokeMiterlimit="10" />
                        <path d="M15.4009 11.0802C13.8709 7.58015 15.4909 6.08016 15.5109 3.66016C17.3909 5.35016 19.5709 5.24015 21.0409 8.61015" stroke="currentColor" strokeMiterlimit="10" />
                        <path d="M10.5899 15.5199C8.05992 12.6599 9.13992 10.7299 8.41992 8.41992C10.7299 9.44992 12.7699 8.67991 15.1999 11.4399" stroke="currentColor" strokeMiterlimit="10" />
                        <path d="M8.29078 21.36C4.78078 19.85 4.94078 17.65 3.30078 15.86C5.83078 15.81 7.34078 14.24 10.7208 15.7" stroke="currentColor" strokeMiterlimit="10" />
                        <path d="M40.0391 27.5702C43.8591 27.5702 44.5891 25.4802 46.7991 24.4902C44.4991 23.4402 43.7191 21.4102 40.0391 21.4102" stroke="currentColor" strokeMiterlimit="10" />
                        <path d="M33.3998 11.0802C34.9298 7.58015 33.3098 6.08016 33.2898 3.66016C31.4098 5.35016 29.2298 5.24015 27.7598 8.61015" stroke="currentColor" strokeMiterlimit="10" />
                        <path d="M38.2096 15.5199C40.7396 12.6599 39.6596 10.7299 40.3796 8.41992C38.0696 9.44992 36.0296 8.67991 33.5996 11.4399" stroke="currentColor" strokeMiterlimit="10" />
                        <path d="M40.5101 21.36C44.0201 19.85 43.8601 17.65 45.5001 15.86C42.9701 15.81 41.4601 14.24 38.0801 15.7" stroke="currentColor" strokeMiterlimit="10" />
                        <path d="M21.2207 40.2402C21.2207 44.0602 23.3107 44.7902 24.3007 47.0002C25.3507 44.7002 27.3807 43.9202 27.3807 40.2402" stroke="currentColor" strokeMiterlimit="10" />
                        <path d="M15.4009 37.9102C13.8709 41.4102 15.4909 42.9102 15.5109 45.3302C17.3909 43.6402 19.5709 43.7502 21.0409 40.3802" stroke="currentColor" strokeMiterlimit="10" />
                        <path d="M10.5899 33.4805C8.05992 36.3405 9.13992 38.2705 8.41992 40.5805C10.7299 39.5505 12.7699 40.3205 15.1999 37.5605" stroke="currentColor" strokeMiterlimit="10" />
                        <path d="M8.29078 27.6309C4.78078 29.1409 4.94078 31.3409 3.30078 33.1309C5.83078 33.1809 7.34078 34.7509 10.7208 33.2909" stroke="currentColor" strokeMiterlimit="10" />
                        <path d="M33.3998 37.9102C34.9298 41.4102 33.3098 42.9102 33.2898 45.3302C31.4098 43.6402 29.2298 43.7502 27.7598 40.3802" stroke="currentColor" strokeMiterlimit="10" />
                        <path d="M38.2096 33.4805C40.7396 36.3405 39.6596 38.2705 40.3796 40.5805C38.0696 39.5505 36.0296 40.3205 33.5996 37.5605" stroke="currentColor" strokeMiterlimit="10" />
                        <path d="M40.5101 27.6309C44.0201 29.1409 43.8601 31.3409 45.5001 33.1309C42.9701 33.1809 41.4601 34.7509 38.0801 33.2909" stroke="currentColor" strokeMiterlimit="10" />
                        <path d="M24.0399 39.5705L37.6599 15.9805H10.4199L24.0399 39.5705Z" stroke="currentColor" strokeMiterlimit="10" />
                        <path d="M24.3805 40.3099C33.1177 40.3099 40.2005 33.2271 40.2005 24.4899C40.2005 15.7528 33.1177 8.66992 24.3805 8.66992C15.6434 8.66992 8.56055 15.7528 8.56055 24.4899C8.56055 33.2271 15.6434 40.3099 24.3805 40.3099Z" stroke="currentColor" strokeMiterlimit="10" />
                        <path d="M24.0399 31.4607C28.2483 31.4607 31.6599 28.0491 31.6599 23.8407C31.6599 19.6323 28.2483 16.2207 24.0399 16.2207C19.8315 16.2207 16.4199 19.6323 16.4199 23.8407C16.4199 28.0491 19.8315 31.4607 24.0399 31.4607Z" stroke="currentColor" strokeMiterlimit="10" />
                    </svg>
                );
            case "anahata": // Relationships (Heart)
                return (
                    <svg viewBox="0 0 45 45" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
                        <path d="M18.3906 7.28C18.3906 3.73 20.8806 3.05 22.0606 1C23.3106 3.14 25.7306 3.86 25.7306 7.28" stroke="currentColor" strokeMiterlimit="10" />
                        <path d="M18.3906 36.9395C18.3906 40.4895 20.8806 41.1695 22.0606 43.2195C23.3106 41.0795 25.7306 40.3595 25.7306 36.9395" stroke="currentColor" strokeMiterlimit="10" />
                        <path d="M7.28 25.7794C3.73 25.7794 3.05 23.2894 1 22.1094C3.14 20.8594 3.86 18.4395 7.28 18.4395" stroke="currentColor" strokeMiterlimit="10" />
                        <path d="M37.1504 25.7794C40.7004 25.7794 41.3804 23.2894 43.4304 22.1094C41.2904 20.8594 40.5704 18.4395 37.1504 18.4395" stroke="currentColor" strokeMiterlimit="10" />
                        <path d="M7.03039 18.0398C4.02039 16.1498 4.77039 13.6898 3.65039 11.5998C6.13039 11.6798 8.02039 10.0098 10.9204 11.8298" stroke="currentColor" strokeMiterlimit="10" />
                        <path d="M11.2494 11.2407C9.47944 8.16069 11.2894 6.3307 11.2794 3.9707C13.4294 5.2007 15.8894 4.61069 17.5994 7.58069" stroke="currentColor" strokeMiterlimit="10" />
                        <path d="M37.1205 18.0398C40.1305 16.1498 39.3805 13.6898 40.5005 11.5998C38.0205 11.6798 36.1305 10.0098 33.2305 11.8298" stroke="currentColor" strokeMiterlimit="10" />
                        <path d="M32.9008 11.2407C34.6708 8.16069 32.8608 6.3307 32.8708 3.9707C30.7208 5.2007 28.2608 4.61069 26.5508 7.58069" stroke="currentColor" strokeMiterlimit="10" />
                        <path d="M7.03039 26.1504C4.02039 28.0404 4.77039 30.5004 3.65039 32.5904C6.13039 32.5104 8.02039 34.1804 10.9204 32.3604" stroke="currentColor" strokeMiterlimit="10" />
                        <path d="M11.2494 32.9492C9.47944 36.0292 11.2894 37.8592 11.2794 40.2192C13.4294 38.9892 15.8894 39.5792 17.5994 36.6092" stroke="currentColor" strokeMiterlimit="10" />
                        <path d="M37.1205 26.1504C40.1305 28.0404 39.3805 30.5004 40.5005 32.5904C38.0205 32.5104 36.1305 34.1804 33.2305 32.3604" stroke="currentColor" strokeMiterlimit="10" />
                        <path d="M32.9008 32.9492C34.6708 36.0292 32.8608 37.8592 32.8708 40.2192C30.7208 38.9892 28.2608 39.5792 26.5508 36.6092" stroke="currentColor" strokeMiterlimit="10" />
                        <path d="M22.0596 36.2399L34.5196 14.6699H9.59961L22.0596 36.2399Z" stroke="currentColor" strokeMiterlimit="10" />
                        <path d="M22.0596 7.98047L34.5196 29.5505H9.59961L22.0596 7.98047Z" stroke="currentColor" strokeMiterlimit="10" />
                        <path d="M22.0607 37.1995C30.3947 37.1995 37.1507 30.4435 37.1507 22.1095C37.1507 13.7756 30.3947 7.01953 22.0607 7.01953C13.7267 7.01953 6.9707 13.7756 6.9707 22.1095C6.9707 30.4435 13.7267 37.1995 22.0607 37.1995Z" stroke="currentColor" strokeMiterlimit="10" />
                    </svg>
                );
            case "manipura": // Posessions (Solar Plexus)
                return (
                    <svg viewBox="0 0 48 46" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
                        <path d="M24.3494 37.8101C32.7662 37.8101 39.5894 30.9869 39.5894 22.5701C39.5894 14.1532 32.7662 7.33008 24.3494 7.33008C15.9326 7.33008 9.10938 14.1532 9.10938 22.5701C9.10938 30.9869 15.9326 37.8101 24.3494 37.8101Z" stroke="currentColor" strokeMiterlimit="10" />
                        <path d="M24.3491 36.8298L36.6491 15.5098H12.0391L24.3491 36.8298Z" stroke="currentColor" strokeMiterlimit="10" />
                        <path d="M15.6409 9.95953C14.3109 5.67953 17.0509 3.93953 17.6909 1.01953C20.0009 3.12953 23.1809 3.07953 24.4609 7.20953" stroke="currentColor" strokeMiterlimit="10" />
                        <path d="M9.53078 17.2291C5.98078 14.4991 7.21078 11.4991 6.05078 8.73915C9.15078 9.12915 11.7308 7.25914 15.1508 9.88914" stroke="currentColor" strokeMiterlimit="10" />
                        <path d="M9.92 27.0193C5.44 27.0193 4.59 23.8793 2 22.3993C4.7 20.8293 5.61 17.7693 9.92 17.7793" stroke="currentColor" strokeMiterlimit="10" />
                        <path d="M33.3005 9.93997C34.6305 5.65997 31.8905 3.92 31.2505 1C28.9405 3.11 25.7605 3.05997 24.4805 7.18997" stroke="currentColor" strokeMiterlimit="10" />
                        <path d="M38.9696 17.2194C42.5196 14.4894 41.2896 11.4894 42.4496 8.72938C39.3496 9.11938 36.7696 7.24937 33.3496 9.87937" stroke="currentColor" strokeMiterlimit="10" />
                        <path d="M15.6409 35.3203C14.3109 39.6003 17.0509 41.3403 17.6909 44.2603C20.0009 42.1503 23.1809 42.2003 24.4609 38.0703" stroke="currentColor" strokeMiterlimit="10" />
                        <path d="M33.3005 35.3398C34.6305 39.6198 31.8905 41.3598 31.2505 44.2798C28.9405 42.1698 25.7605 42.2198 24.4805 38.0898" stroke="currentColor" strokeMiterlimit="10" />
                        <path d="M38.9696 27.5391C42.5196 30.2691 41.2896 33.2691 42.4496 36.0291C39.3496 35.6391 36.7696 37.5091 33.3496 34.8791" stroke="currentColor" strokeMiterlimit="10" />
                        <path d="M9.53078 27.5391C5.98078 30.2691 7.21078 33.2691 6.05078 36.0291C9.15078 35.6391 11.7308 37.5091 15.1508 34.8791" stroke="currentColor" strokeMiterlimit="10" />
                        <path d="M38.5801 26.9998C43.0601 26.9998 43.9101 23.8598 46.5001 22.3798C43.8001 20.8098 42.8901 17.7498 38.5801 17.7598" stroke="currentColor" strokeMiterlimit="10" />
                    </svg>
                );
            case "svadhisthana": // Joy (Sacral)
                return (
                    <svg viewBox="0 0 47 42" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
                        <path d="M11.1707 12.92C8.52066 8.13998 12.2407 4.88 12.7207 1C16.4507 2.7 21.1107 1.37001 23.6607 5.98001" stroke="currentColor" strokeMiterlimit="10" />
                        <path d="M10.67 27.9793C5.21 27.9793 4.17 23.1392 1 20.8392C4.3 18.4092 5.4 13.6892 10.67 13.6992" stroke="currentColor" strokeMiterlimit="10" />
                        <path d="M36.4805 27.9793C41.9405 27.9793 42.9805 23.1392 46.1505 20.8392C42.8505 18.4092 41.7505 13.6892 36.4805 13.6992" stroke="currentColor" strokeMiterlimit="10" />
                        <path d="M36.1404 12.92C38.7904 8.13998 35.0704 4.88 34.5904 1C30.8604 2.7 26.2004 1.37001 23.6504 5.98001" stroke="currentColor" strokeMiterlimit="10" />
                        <path d="M11.1707 28.75C8.52066 33.53 12.2407 36.79 12.7207 40.67C16.4507 38.97 21.1107 40.3 23.6607 35.69" stroke="currentColor" strokeMiterlimit="10" />
                        <path d="M36.1404 28.75C38.7904 33.53 35.0704 36.79 34.5904 40.67C30.8604 38.97 26.2004 40.3 23.6504 35.69" stroke="currentColor" strokeMiterlimit="10" />
                        <path d="M23.6603 35.43C31.7181 35.43 38.2503 28.8978 38.2503 20.84C38.2503 12.7822 31.7181 6.25 23.6603 6.25C15.6025 6.25 9.07031 12.7822 9.07031 20.84C9.07031 28.8978 15.6025 35.43 23.6603 35.43Z" stroke="currentColor" strokeMiterlimit="10" />
                        <path d="M23.6608 32.4309C29.7967 32.4309 34.7708 27.4568 34.7708 21.321C34.7708 15.1851 29.7967 10.2109 23.6608 10.2109C17.5249 10.2109 12.5508 15.1851 12.5508 21.321C12.5508 27.4568 17.5249 32.4309 23.6608 32.4309Z" stroke="currentColor" strokeMiterlimit="10" />
                        <path d="M23.6606 26.7509C28.228 26.7509 31.9306 23.0484 31.9306 18.481C31.9306 13.9136 28.228 10.2109 23.6606 10.2109C19.0932 10.2109 15.3906 13.9136 15.3906 18.481C15.3906 23.0484 19.0932 26.7509 23.6606 26.7509Z" stroke="currentColor" strokeMiterlimit="10" />
                    </svg>
                );
            case "muladhara": // Body (Root)
                return (
                    <svg viewBox="0 0 40 40" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
                        <path d="M3.64117 19.6931C-1.73883 14.0431 2.84117 7.6131 2.39117 1.8131C8.46117 2.5231 15.0112 -1.5669 20.2012 3.8731" stroke="currentColor" strokeMiterlimit="10" />
                        <path d="M3.64117 19.9023C-1.73883 25.5523 2.84117 31.9823 2.39117 37.7823C8.46117 37.0723 15.0112 41.1624 20.2012 35.7224" stroke="currentColor" strokeMiterlimit="10" />
                        <path d="M36.2221 19.6931C41.6021 14.0431 37.0221 7.6131 37.4721 1.8131C31.4021 2.5231 24.8521 -1.5669 19.6621 3.8731" stroke="currentColor" strokeMiterlimit="10" />
                        <path d="M36.2221 19.9023C41.6021 25.5523 37.0221 31.9823 37.4721 37.7823C31.4021 37.0723 24.8521 41.1624 19.6621 35.7224" stroke="currentColor" strokeMiterlimit="10" />
                        <path d="M20.0007 35.8627C28.8538 35.8627 36.0307 28.6859 36.0307 19.8328C36.0307 10.9796 28.8538 3.80273 20.0007 3.80273C11.1476 3.80273 3.9707 10.9796 3.9707 19.8328C3.9707 28.6859 11.1476 35.8627 20.0007 35.8627Z" stroke="currentColor" strokeMiterlimit="10" />
                        <path d="M20.0021 27.3917L27.5821 14.2617H12.4121L20.0021 27.3917Z" stroke="currentColor" strokeMiterlimit="10" />
                        <path d="M31.172 8.66406H8.83203V31.004H31.172V8.66406Z" stroke="currentColor" strokeMiterlimit="10" />
                    </svg>
                );
            case "result": // Summary icon
                return (
                    <svg viewBox="0 0 44 44" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
                        <path d="M25.6673 3.66602H11.0007C10.0282 3.66602 9.09556 4.05232 8.40793 4.73996C7.72029 5.42759 7.33398 6.36022 7.33398 7.33268V36.666C7.33398 37.6385 7.72029 38.5711 8.40793 39.2587C9.09556 39.9464 10.0282 40.3327 11.0007 40.3327H33.0006C33.9731 40.3327 34.9057 39.9464 35.5934 39.2587C36.281 38.5711 36.6673 37.6385 36.6673 36.666V14.666L25.6673 3.66602Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M25.666 3.66602V14.666H36.666" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M29.3327 23.833H14.666" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M29.3327 31.167H14.666" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M18.3327 16.5H16.4993H14.666" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                );
            default:
                return <circle cx="12" cy="12" r="6" fill="currentColor" />;
        }
    };

    return getIcon(id.toLowerCase());
};
