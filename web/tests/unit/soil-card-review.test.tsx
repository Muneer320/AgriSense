import { act, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { LanguageProvider } from '@/components/language-provider';
import { SoilCardUpload } from '@/features/soil/soil-card-upload';

const api=vi.hoisted(()=>({upload:vi.fn(),extract:vi.fn(),job:vi.fn(),get:vi.fn(),confirm:vi.fn()}));
vi.mock('@/lib/media/upload',()=>({uploadAttachment:api.upload,UploadError:class extends Error{}}));
vi.mock('@/lib/api/routes',()=>({jobs:{get:api.job},soil:{extract:api.extract,get:api.get,confirm:api.confirm}}));
const draft={id:'synthetic-soil',field_id:'synthetic-field',version:3,confirmation_state:'draft',ph:{value:7.1,unit:'pH',missing_reason:null},organic_carbon:{value:null,unit:'%',missing_reason:'not_read_from_card'},nitrogen:null,phosphorus:null,potassium:null};

beforeEach(()=>{
  vi.useFakeTimers();vi.clearAllMocks();localStorage.clear();
  api.upload.mockResolvedValue('synthetic-media');api.extract.mockResolvedValue({data:{id:'synthetic-job'}});
  api.job.mockResolvedValue({data:{status:'succeeded',result_id:'synthetic-soil'}});
  api.get.mockResolvedValue({data:structuredClone(draft)});api.confirm.mockResolvedValue({data:{}});
});
afterEach(()=>{vi.useRealTimers();});
async function upload(){
  const input=document.querySelector<HTMLInputElement>('input[type=file]')!;
  await act(async()=>{fireEvent.change(input,{target:{files:[new File(['synthetic-only'],'soil.png',{type:'image/png'})]}});});
  await act(async()=>{await vi.advanceTimersByTimeAsync(2000);});
}

describe('soil-card human review',()=>{
  it('keeps unknown values empty and saves only after the user confirms corrected values',async()=>{
    const saved=vi.fn();
    render(<LanguageProvider><SoilCardUpload field={{id:'synthetic-field',name:'Synthetic plot'}} onSaved={saved}/></LanguageProvider>);
    await upload();
    expect((screen.getByLabelText('pH (pH)') as HTMLInputElement).value).toBe('7.1');
    expect((screen.getByLabelText('Organic carbon (%)') as HTMLInputElement).value).toBe('');
    expect(api.confirm).not.toHaveBeenCalled();
    fireEvent.change(screen.getByLabelText('pH (pH)'),{target:{value:'6.8'}});
    await act(async()=>{fireEvent.click(screen.getByRole('button',{name:'Save these values'}));});
    expect(api.confirm).toHaveBeenCalledTimes(1);
    const request=api.confirm.mock.calls[0]![1];
    expect(request.expected_version).toBe(3);
    expect(request.observation.ph.value).toBe(6.8);
    expect(request.observation.organic_carbon.value).toBeNull();
    expect(request.observation.organic_carbon.missing_reason).toBe('not_read_from_card');
    expect(saved).toHaveBeenCalledTimes(1);
  });
  it('discarding an extracted draft never confirms it',async()=>{
    render(<LanguageProvider><SoilCardUpload field={{id:'synthetic-field',name:'Synthetic plot'}}/></LanguageProvider>);
    await upload();fireEvent.click(screen.getByRole('button',{name:'Cancel'}));
    expect(api.confirm).not.toHaveBeenCalled();
    expect(screen.getByRole('button',{name:'Choose a photo'})).not.toBeNull();
  });
  it('uses the selected locale for the upload controls',async()=>{
    localStorage.setItem('agrisense.language','hi');
    render(<LanguageProvider><SoilCardUpload field={{id:'synthetic-field',name:'Synthetic plot'}}/></LanguageProvider>);
    expect(screen.getByRole('button',{name:'फ़ोटो चुनें'})).not.toBeNull();
  });
});
