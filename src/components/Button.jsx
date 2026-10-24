import { Arrow } from './Icons.jsx';

export default function Button({ children, href = '/contact/', variant = 'primary', small }) {
  return (
    <a href={href} className={`btn btn-${variant}${small ? ' btn-sm' : ''}`}>
      <span>{children}</span>
      <i className="btn-ic"><Arrow width={16} height={16} /></i>
    </a>
  );
}
