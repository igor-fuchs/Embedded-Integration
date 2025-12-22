import Logo from '@assets/logo.svg';
import ReactIcon from '@assets/icons/react-icon.svg';
import DotNetIcon from '@assets/icons/dotnet-icon.png';
import ConfigIcon from '@assets/icons/config-icon.svg';
import PaintIcon from '@assets/icons/paint-icon.svg';
import IndustrialIcon from '@assets/icons/industrial-icon.svg';

export const listCards = [
    {
        key: "factory-io",
        iconClass: "factory-io",
        icon: IndustrialIcon,
        title: "Factory IO",
        description:
            "3D factory simulation platform providing realistic industrial automation scenarios and equipment modeling.",
    },
    {
        key: "tia-portal",
        iconClass: "tia-portal",
        icon: Logo,
        title: "TIA Portal",
        description:
            "Siemens engineering framework for PLC programming, and industrial automation control.",
    },
    {
        key: "react",
        iconClass: "react",
        icon: ReactIcon,
        title: "React",
        description:
            "Modern JavaScript/TypeScript framework for building responsive user interfaces and real-time data visualization dashboards.",
    },
    {
        key: "dotnet",
        iconClass: "dotnet",
        icon: DotNetIcon,
        title: ".NET",
        description:
            "Server-side runtime enabling real-time communication and data processing between systems.",
    },
    {
        key: "protocols",
        iconClass: "siemens-plc",
        icon: ConfigIcon,
        title: "Communication Protocols",
        description:
            "OPC UA and HTTP enabling communication between industrial devices and web services.",
    },
    // {
    //     key: "pixel-art",
    //     iconClass: "pixel-art",
    //     icon: PaintIcon,
    //     title: "Pixel Art",
    //     description:
    //         "Custom animated pixel art visualizations bringing factory operations to life in a unique artistic style.",
    // },
];
