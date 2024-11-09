import {describe, expect, it} from 'vitest';
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

describe('App', () => {
    it('should render', async () => {
        //Render the component
        render(<App />);

        await screen.findByRole('title');

        //Check if the component is rendered
        expect(screen.getByRole('title')).toBeInTheDocument();
        expect(screen.getByRole('title')).toHaveTextContent('Kadivaalam');
    });
});