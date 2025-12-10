export interface GuideStep {
  id: string;
  title: string;
  description: string;
  codeReference: string;
}

export interface Resource {
  id: string;
  title: string;
  type: string;
  url: string;
  duration: string | null;
}

export interface Criteria {
  id: string;
  label: string;
}
