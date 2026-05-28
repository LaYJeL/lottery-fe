import { headerGradient } from './competitionStyles';

export function CompetitionRules() {
    const steps = [
        {
            number: '01',
            title: 'Choose & Pay',
            description: 'Select a competition and pay the entry fee to participate'
        },
        {
            number: '02',
            title: 'Submit Entry',
            description: 'Upload your work following the competition guidelines'
        },
        {
            number: '03',
            title: 'Win Prizes',
            description: 'Get voted by the community and win amazing prizes'
        }
    ];

    return (
        <div style={{ ...headerGradient, padding: '2rem', borderRadius: '1rem' }}>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', fontWeight: 600 }}>
                How Competitions Work
            </h2>
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '1.5rem'
            }}>
                {steps.map((step) => (
                    <div key={step.number}>
                        <div style={{ fontSize: '1.875rem', marginBottom: '0.5rem', opacity: 0.8 }}>
                            {step.number}
                        </div>
                        <div style={{ fontSize: '1.125rem', marginBottom: '0.5rem', fontWeight: 600 }}>
                            {step.title}
                        </div>
                        <p style={{ color: 'rgba(255,255,255,0.8)' }}>
                            {step.description}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}
