import './index.css';
import { createRoot } from 'react-dom/client';
import { App } from '@components/App';

const root = document.createElement('div');
document.title = 'Hello World!';
document.body.appendChild(root);
createRoot(root).render(App({}));
