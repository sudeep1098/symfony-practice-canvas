
interface Data {
    name: string;
    email: string;
    country: string;
}

interface Response {
    statusMessage: string;
    message: string;
    receivedData: Data;
}

interface Props {
    link: string
}

interface NativeName {
    common: string;
    official: string;
}

interface Name {
    common: string;
    official: string;
    nativeName: {
        [key: string]: NativeName;
    };
}

interface Country {
    name: Name;
    cca2: string;
}
