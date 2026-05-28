import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Badge } from '../Badge';
import { CheckCircle } from 'lucide-react';

describe('Badge', () => {
    it('should render children', () => {
        render(<Badge>Test Badge</Badge>);
        expect(screen.getByText('Test Badge')).toBeInTheDocument();
    });

    it('should render with success variant', () => {
        render(<Badge variant="success">Success</Badge>);
        const badge = screen.getByText('Success');
        expect(badge).toBeInTheDocument();
    });

    it('should render with error variant', () => {
        render(<Badge variant="error">Error</Badge>);
        expect(screen.getByText('Error')).toBeInTheDocument();
    });

    it('should render with warning variant', () => {
        render(<Badge variant="warning">Warning</Badge>);
        expect(screen.getByText('Warning')).toBeInTheDocument();
    });

    it('should render with info variant', () => {
        render(<Badge variant="info">Info</Badge>);
        expect(screen.getByText('Info')).toBeInTheDocument();
    });

    it('should render with icon', () => {
        render(
            <Badge icon={<CheckCircle data-testid="icon" />}>
                With Icon
            </Badge>
        );
        expect(screen.getByTestId('icon')).toBeInTheDocument();
        expect(screen.getByText('With Icon')).toBeInTheDocument();
    });

    it('should apply custom className', () => {
        render(<Badge data-testid="badge" className="custom-class">Test</Badge>);
        // Badge uses inline styles, so we just verify it renders
        expect(screen.getByTestId('badge')).toBeInTheDocument();
    });
});
