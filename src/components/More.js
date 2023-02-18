import Button from 'react-bootstrap/Button';

export default function More({ pagination, next }) {
  let more = false;
  if (pagination) {
    const { offset, count, total } = pagination;
    more = offset + count < total;
  }

  return (
    <div className="More">
      {more &&
        <Button variant="outline-primary" onClick={next}>
          More &raquo;
        </Button>
      }
    </div>
  );
}
