export function generateRandomId(length: number, icludeString: string): string {

    let lowercase = 'abcdefghijklmnopqrstuvwxyz';
    let uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let numbers = '0123456789';

    let chars = '';
    let randomId = '';

    if (icludeString.includes('-')) randomId += '-';
    if (icludeString.includes('lowercase')) chars += lowercase;
    if (icludeString.includes('uppercase')) chars += uppercase;
    if (icludeString.includes('numbers')) chars += numbers;

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * chars.length);
      randomId += chars.charAt(randomIndex);
    }
  
    return randomId;
  }