import { Request } from '@/components/Request';
import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';

const Blog = () => (
  <Main meta={<Meta title="Lorem ipsum" description="Lorem ipsum" />}>
    <div className="container grid grid-cols-3 justify-center gap-x-2.5">
      <div className="h-screen max-w-screen-sm rounded-lg border-2 border-solid border-sky-500 bg-slate-800">
        Docs
      </div>
      <div className="h-screen max-w-screen-sm rounded-lg border-2 border-solid border-sky-500 bg-slate-800">
        <Request />
      </div>
      <div className="h-screen max-w-screen-sm rounded-lg border-2 border-solid border-sky-500 bg-slate-800">
        Response
      </div>
    </div>
  </Main>
);

export default Blog;
