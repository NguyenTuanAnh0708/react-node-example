import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {useState} from 'react';

const Home = () => {
  const [lang, setLang] = useState<string>('vn');
  return (
    <div>
      <header>
        <Select
          onValueChange={(value: string) => {
            setLang(value);
          }}
          value={lang}
        >
          <SelectTrigger className='w-[180px]'>
            <SelectValue placeholder='Theme' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='vn'>vietnamese</SelectItem>
            <SelectItem value='en'>english</SelectItem>
          </SelectContent>
        </Select>
      </header>
      <main>{lang} My Name Is Tuan Anh</main>
    </div>
  );
};

export default Home;
