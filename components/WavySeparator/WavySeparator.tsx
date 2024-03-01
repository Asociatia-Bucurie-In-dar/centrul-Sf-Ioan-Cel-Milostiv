import { Paper } from '@mantine/core';

const WavySeparator = () => {
    const waveSvgPath = 'M0,224L48,213.3C96,203,192,181,288,186.7C384,192,480,224,576,224C672,224,768,192,864,181.3C960,171,1056,181,1152,192C1248,203,1344,213,1392,218.7L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z';

    return (
        <div>
            <svg viewBox="0 0 1440 320">
                <path fill="#0099ff" fillOpacity="1" d={waveSvgPath}></path>
            </svg>
            <Paper shadow="md" />
        </div>
    );
}

export default WavySeparator;