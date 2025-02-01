"use client";

import React from "react";
import { FormField } from "../FormField";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";

export const AddSongForm = () => {
  const [file, setFile] = React.useState<File | null>(null);

  console.log(file);

  return (
    <form className="flex items-center gap-6">
      <div className="flex flex-col items-center gap-6 flex-1">
        <FormField>
          <Label htmlFor="title">Titulo</Label>
          <Input type="text" id="title" />
        </FormField>
        <FormField>
          <Label htmlFor="artist">Artista</Label>
          <Input type="text" id="artist" />
        </FormField>
        <FormField>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Privacidade" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="public">Publico</SelectItem>
              <SelectItem value="private">Privado</SelectItem>
            </SelectContent>
          </Select>
        </FormField>
        <FormField>
          <Label htmlFor="file">Arquivo</Label>
          <Input
            type="file"
            id="file"
            accept=".mp3"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
          />
        </FormField>
      </div>

      <Image
        className="rounded-lg aspect-square object-cover "
        draggable={false}
        src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxITEhUTEhMVFhUWGRgbGRcXGBcVGhoXGxgYGhcdGBcYHSggGBolGxUXITEhJSkrLi4uGB8zODMtNygtLisBCgoKDg0OGxAQGy0lICUtLi0tKy0tLS0tLS0vLS0tLS0tKy0tLS0tLS8tLS8tLS0tLS0tLS0tLS0tLS0tLS0tLf/AABEIAKgBLAMBIgACEQEDEQH/xAAbAAEAAwEBAQEAAAAAAAAAAAAABAUGAwIHAf/EAEAQAAEDAgQDBQcCBQIEBwAAAAEAAhEDIQQFEjFBUWEGcYGRoRMiMrHB0fBC4RQjUnLxQ4IVU2KSBzODsrPC4v/EABoBAQADAQEBAAAAAAAAAAAAAAACAwQBBQb/xAAnEQACAgICAgEEAgMAAAAAAAAAAQIRAyESMQRBIhNRYXEykSNCgf/aAAwDAQACEQMRAD8AyyIiiZwiIgCIiAIiIAiIgCIiAIiIAvdKm5xDWgkngBJU3JspfiHw2zRu7l+62mDwlLDNhgE/qed/37lXKaRfiwOe/RmcH2WquvUc2mOvvHyH3V1huymFHxvqO8Q0eg+qsA2o82loPEiXHwNmr8/gGzcajzd7xnx29FRLKz0MfhL7EGrk+Xiw/wDl/wD0uR7PYV/wah/a/V91aewIMECOSkf8OY+CWNPht9lH6rLH4cPwZHFdlj/p1AejhB8x9lS4zA1KRh7SOvA+K+hYjLnM+BxA5OJe0+Ju3zXCm8H3KjO9jryObTxCtjlMuTw16PniLS572c0j2tC7OLdyO77LNK6Mk+jDODg6YRdKFB7zDGuceTQXfJSH5VXAk0agH9pXbI0yGiEIunAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAi/QOSumjC0/cfTL3D4nAnfjEEcbKLlRZDG5lIi157MUajQ6k8t1C159Df1Vbiuytdu2l3oft6rimjrwyRRLvg8Majwxu5+XFeq+X1WfFTcPCfUK07OUnNcSWuBtB0kkDjAi6SlSsY8TlNJmtw9FuHpBjbGLxc+HMkrrgsLJ1P3Gzdw37u6/h45c41CXk2aTBiL7THAjaO9W9FoG3eT1PNYpSPcx4eK2d8NT5iPspAwwmyi0pn88FMdU91cRyd3oiVcMD0kr17CN7r17TnxK/RXtB80JXI9nDtI6HxVRmOWtc3TtFxG47ip5fuB5Li554+PeliON+2UFLEOYS2oLjfk5vAjqq7AdlRiK5dOmjMmNyeQ5DqrvE1BLm1ACeB4aTtHLke5Q8gzY0qppOu0/CeXIHp9Voja2ZMuNPRt8uy2lSaGsa1oHAWXjHsHCFGOM1bKPUxF7rjkRWNmY7V5M14LwIcOPPoeawpEWO4X1LG1BtzXz/ALQYcMq22cJ8eP0U8U70ZvJw0uSKxERXmMIiIAiIgCIiAIiIAiIgCIiAIiIAiIgO2DqBtRrjsCCVon5OaxNShUaWv3k7H8+ay6k4HHVKTtVN0dOB7woSjfRdiyKOmfRcvy/2VFlOzo36k7wpLadt3N6SCPVUmSdpWVPdf7r/AEPcr8PnaFWaVT2iFmA9wzB5EWvPL91AysQ/UOAKl5rUsG/nRc8r2Kg2XwWiyp0oEdZPhzXdsfnEqOX7ngQPrbzXbXpkncC6zHqejqamncrq15NvNQaFOTrc4E8IuPJTKIj3ipqNlUmjqyjJk+C8YgQCQu1KSJ4LliWkK1xVFUZNMie0H590q1IAPmOYXN1Mc1y/iODuBg+QIPqq5QrovjNPsh9o6UN1i+n/ANp3+h8Fm6j/APPHotniqIc0tP6gR6WXzzG1y1ukAl8lsdRufRTxPVGfPCqZssuzGWtdzF+/ipL6+ozKy3Z+sdLmndsev+FbsdKi+zrjas71KsrJdpXzUA5D6/stDjMW2m2XH9+5YzFVy9xcePoOAV2GO7MHmTSjxOSIi0HnBERAEREAREQBERAEREAREQBERAEREAREQBaHA9oKwYGinri2qY+ZVRl2CNV0DYbrY5ZlG0CwhU5ZJaN3h4ZP5eipdntUzNGD5/VecB2naCWvaQOJFoHHiZ9Ff9ocO1rDa21t+qwmIFw0AWBJ534d1/kqFI9JYE1aPpjXe6OhB+vzUbE1zrcw7ODSD4KPlGNmg1x/pv4D/KpsX2jpF93XHBo1QPBRgtmltJGtwukCOKluuI5rGU8+Ydi4Rxc1wF5i5EcCrXLs7vBiFfSM/e0XjMOf63AWESvFZhn4zFtzKlUcS0iQJULMMcxk3CjwRxN2HNvPBVmPePfjfV/9WqBi+0DZgnfYC5PcBcqpqZ7S1ODvaC/FjhwHRS0S6NPluILqfvfpMSst2gp6a74BhxB6XF/UKbl2f04gGW3VXnWJc5+oGx03nccug371T1IvcVOJ+ZcXNcXDjaFYYzGVWtJYB5XhS8FhgYjpB7+Y5WVnWyyG225G8FFLdlOSNx43R8+r13PMuJJ/PJc1b55l2h2posdxy69yqFsi01o8DLCUJNSCIikVhERAEREAREQBERAEREAREQBERAEREARECA2PZ3BBtKTuS31n7jyWmJiwt7w+SqMngsA7j5D7KyxRggcZb6rBkds+iwQUYJEbtGdTWx1XzrFy17+ek79D9r+C+lY5msEciQO9YbOKJBFSLsNxzGx9JC4uy1OkWPZKo84d/wCohxAb/tme7ayy2FwlCliT/GM1McDpc4amtuCLGw4iVsuztINpxTFnOPvdC3eegC4nQ8XAMKMsnBkni+rHXooG9nWt96jWaxhuSx7WnaI1AyR/07dFZdmsLUewkEEAwHNjYl2mQNnQAY6hdsLgMOXEexpk7zAK038dTpU7hrWjgBA8ArMeSMimWOS3S/4Scqwbw33nSfL0VRmWBqPefety6966YXEYquC9jhSYPhBEud1dyHRRMJnkVPZ14a8fq/S77FX2iuN9mPdl76tR4NXQ4RDQ8NkSbPvcyDY2E+arlWDoU6hq+yqVXtOljdJdrP8AS1vwCeUei2ea4CnU957GuPUA8vsqilltKm6WtA6AAc/LdZp5eLrZdHA5L1v37M9lGXGnSLnSJIgHgJFvQqZScXBg32HjLifp5qfmJ1lrJ6nu/CvOUsaa7Wt2YDH9x4rqbatlsnDH8V+jU4SnpDG8Tb881bPrXg93fb9lX0TfUOFgulU3I5EekwoEWrIeZ4cEd0x4gghYStT0uIX0XENkxxv481iM9o6ap6rTglujzPPxripFciItJ5QREQBERAEREAREQBERAEREAREQBERAEREBuOzT5psJ4NcfG4V48iKbj0H56LM9k6v8sjkY8DP1WifdoHVYci+TPoME7xr9HkPl7mni4wesfVUWf4OWuI3+v581cRInk5vzhecY4OY4nmoosbM/2d1HDvBEta4wOJtJEcQSomBqh21unK+3gpfZkuDKoABc0yBxJLTF+UhUOExRa6TsTfv5q2UOVlGDyPpcFL3a/o1eAwLQZ4qVnOH/AJJOnVpLTG9gRJ8pUXA4qwIMrtmOdspMLn7dLyeAXccUkX5ZtspMN2wa0OABaBI94b9y/MFUZjHx7NwidRPKDBHIzCp63ah7nav4UubPu+5ae+LlXeQdqWuIpupljzb4Yv1EIu9kG9HSs+rhfdJ9pS6/E37hcsVmlMtmndx4cu9Ts3rBwWbxbwPh3KNboknwjbejxhq8VNTzI2+5Hd9FY5AWtqhsgyYm/UcepVbgqGp0HaCfzxK75MP5rTyupuK2vweZHPJyjJ+2zc0OH91/AmfWV6cZPeT8h915Y+L8/n+SvdYREdfWFlo9e7PFN3vO/wCl3yhZftS27T1PktS4aSWjoT3m6y3at41MaOAKtw/yMfmNfSZQoiLYeIEREAREQBERAEREAREQBERAEREAREQBERAXXZjGBlTSdnfNauhiYJB2/IXztriDI3CusFnZFn+aoyY72jd43kKK4s1zyGAj+p1vJV2fYkU2Bk33P54Ly/MmhranxaNh6D5rJ5hjXVXFzuKrhjtmnN5CgvyS8kqvBrObEim48fCIVUrnsxXDX1Gn9TD6XVLwWhds8/I7xxd/c8U899i4AGWnccu5WjsxFZpDSCHcFU4nJab3BtLUbAjn4jhF/wAKhfwD2O9x8OHPf0VTaZ6WNTgknsnHK6pMMe4DkJPzVllmHdSmfiO5O/qo2A7Q4imINNrjzBAUTMM2xFQ/CGA8iJ8+CjSRdzJua5qGWmXcvuqJuNqai43Bj8HJfn8C83tfjuuuHpQdJ9ea7dbRCSeT4y6LHCYmRqb1H0UnAVtD2nhse5V+Ebp1MPAz4FSVcqas8nIpY58fszXYrHPGnQQBHKZud+S7YTN7j2sQDuJ8JHKVmsJmEQHcF0rYkOaSNr3AJFusQqHFLTPVhk5rlE1lXMG63aQXE/0xHmT3LEZt7T2jnVAWlxO/LhHCy0GQ41gLiGlzuQiYkDjvEjwHQqP2hxbalBhbJDTIcRpkmZBGomII4cN7qMJU9DNjU18jOUyva50TZdFrXR4+SlJ0ERF0gEREAREQBERAEREAREQBERAEREAREQBEX45wFzYID3rO02XlQK2ZtHwjV12C+gZJ2VoVaLKzqj3a2g6RDYPEHcyDI3UXJIsUJSMe1xGxUnLsvqV3hlNsnieAHMngFu3dlMJHwO/73fdSKOGZhqRbRbEmSdyT1Kg8i9E1hd7IuAyDC4Zn852s8ZMMn+2b+M+CYxuFqjSxtOOEAfRYXNMXVrVHCoSIPw8Ap3ZqlpqPI+EATy1f4VXs3PG1HkV2Y4Ysr6A90aZbsbSQWmRffjwK4uaS83OrcwIEG3AR4K6o1fa4p5j3WjTPMky76K2weXtcHQNif2RkovRkqA9zUA8i5j4TI5bQoWNu6GiCYIAE3v62VrntFxeQJIbysLbqI7D6Ie2T6zPAngot0asOKWSS4nnHYaozQ6qwsdAmf6TsV+NdeDv8+5d80xlSppDg6QCJIsBbjtC4sogiGkmNvDkpwnRR5fjPI/yTcA2s46KTnid4JA7zC0mSmlQa9r5h17guOoWcDHgfNZ/KMxqU5Y1gdIubAXkXJ62VXjcRUc+XON5kSYkWMjjsd12XyZVi/wAMFfbL/CONMazRFRjzDZIi7iWw122695vj4Ps6tIMHuuMEGRLrG1h7p8wqDC1HksYHGCdpJAIIvHBd8yeXViHQ4ACS07nv5/dRUKlRbLMnj5HFgsIHnuD1/Lr9XRj4nqCI71zWlHjy7sIiLpEIiIAiIgCIiAIiIAiIgCIiAIiICrzbMiw6GfFEk8h9Sqd2MrOtrd4W9Qp+eubrED3gLnpw+qmZZg2ls2lRlLirNWHFz0iopGo39T/+4n0Nl6q4l7oDiTH5wVvjaIAlU2m+65GXJWTyYuEqOTn3X1j/AMJ8xL6D6B/0zqb/AGu3HgRP+5fIqhutP2Dzb2GLpuLoa46HcoeQL9xg/wC1Jq0Ri9n2yo1cKlGQpb+qou1+dnCtYGBmp8+88lrGtaJJcQCVmSLSk7XZP/qs+IfF1H7Khr5iKVP2VA6nm7n8p68+QV9k3aA4thLmgGGm0wWu2sdj0WXrYFzatRjWkgG0Rsb8T19FYWK+me8HmXs2wGRHUeJVjhO0r2j3aRv1H3UFmX1DtSJ8W/dSsJlFbSAaTrDgWx81F0SR0xGcOe1wNIDUImRabSoeCqPAIJhwB+EyI5EHu+SsHZZVDTNMxBn3m2seqpcC3U5x4kPM3vYD6FQka/HindM7+9Il5gzwbw8Oi6OokAuDhAMQdIkmTYAXsDyUbLMtNRuoPYDyeSPzz4LpUyp//Opn/wBRx+qIte+u/wBvR2okhwh0TIsOnXuPmvOGy9rqrpmAY4RvI791FfRfTMvc0gxBBLovPHyV1RBN+Jg2sOkKcV7MnkSTbSVHP+Cays3QIEQDv73GVCxuEIHtN9ROro6fkVpcNl/tHCTAU3MMqawERLHCCpp07Mk/lDiYFFIx2FNN5afA8xwUdXGBqnQREXTgREQBERAEREAREQBERAEREAREQETHYBtQgndv5fy9Sq2ngsTTkhpc1u7m7fdXq1VCmGYVkWkSe8qEpUi/AnJ0fMMRjXusZ8VzoUXOMNEq47X4cioHjaIPfv8AdR8oqNESAYIMG4IE2I4iYMcYRP42i5xbnTZXYnDOb8QhfmHOkgjcbdFYY5wbT0kgkmbDSNyTA4bgeCrGFSTtEZR4uj7F2Ez+tifatqHU1hGioWhhcLi4DiJsDvxV/nmW0cSwNqzLZ0kbjn5r5plWYGhTDKLzJM2Ni6BJI5WWt/46YveyztW9F7i40znRwVOhLWA33JuTGypm1dVeoejfr+yZrnUTzOw4/wCFEyvYkm7jJPVKony5GlwjfcJ5FXmTCWKpwI/lu7j8la5ONNMAqt9k/wDUrO0lY06J07uOnzB+yxmC1NB4WIWx7VUy+kY/SdR7hM/NY+o8Bs6mgwbSAYg87m8bf4NvRo8dJxbIeIqA0XNZJdpNhY7iYPOJVL7F3/Lrxp5O3jjbmrOi5kw7THePyV6dTpQ6CJEWsTtzGwXU6LZ/NpsrMNSdqZIq7knVq0gBp3tC3uDENb3BZPBgGrTEfqvfgvpWX4BrgCRZTTMOeouiCxromSArVmINSmQbwuOdkNbAGy5ZT/5Y6rtlDRV5xg9dOeLdvqFmFqu0uJLGaRu4x4RdZVWw6MuerCIimUhERAEREAREQBERAEREAREQBERAFfYXOGupNpOEFojbfuKIoTVo0eO6kVOZ4UVGlrgYO3+VicUH0naXDx4EdERQxvdGrKtWRvbI2oiK8y2TMsx4p1A47ce7j6LTVsxe4RTED+o/QL9RQkThvR1yzB3lxmdyd1pcPkjagmm7S7lw8l+IqW7NDXHo70sLVDgw1dJaDLCJ1ciDyXSlQxDWwa8+8SCB+mZDSI24SiKmSplsHaIOcVKzGuAc46tiLjrbf0UBuQ06rPaUnmNiHC4I3F7r9RTiqRxya6M7neUvpua0mx4gW8VSOwROqD070RTQk242y/7N4ANq0wTxknu4ea+of8Sp0xBMQERdKpIpMZmzKky06ef7L1lmPDBpcJA4j7IiCiB2pxDXaI5n5FUKIrY9GPN/IIiKRSEREAREQBERAf/Z"
        width={250}
        height={250}
        alt="Album cover"
      />
    </form>
  );
};
