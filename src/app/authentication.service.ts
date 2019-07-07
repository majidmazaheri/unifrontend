import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable, of } from 'rxjs'
import { map } from 'rxjs/operators'
import { Router } from '@angular/router'

export interface UserDetails {
  id: number
  name: string
  phone: number
  email: string
  password: string
  exp: number
  iat: number
}

export interface User {
  id: number
  name: string
  phone: number
  email: string
  password: string
}

export interface Password {
  id: number
  password: string
}

export interface DeviceDetails {
  d_id: Number;
  password: string;
  fk_id: Number;
  d_name: string;
  p_name: string;
  s_moisture: number;
  e_s_moisture: number;
  light: number;
  e_light: number;
  a_moisture: number;
  e_a_moisture: number;
  temp: number;
  e_temp: number;
  watering_mode: boolean;
}

interface TokenResponse {
  token: string
}

export interface TokenPayload {
  id: number
  name: string
  phone: number
  email: string
  password: string
}

@Injectable()
export class AuthenticationService {
  private token: string

  constructor(private http: HttpClient, private router: Router) { }

  private saveToken(token: string): void {
    localStorage.setItem('usertoken', token)
    this.token = token
  }

  private getToken(): string {
    if (!this.token) {
      this.token = localStorage.getItem('usertoken')
    }
    return this.token
  }

  public getUserDetails(): UserDetails {
    const token = this.getToken()
    let payload
    if (token) {
      payload = token.split('.')[1]
      payload = window.atob(payload)
      return JSON.parse(payload)
    } else {
      return null
    }
  }

  public isLoggedIn(): boolean {
    const user = this.getUserDetails()
    if (user) {
      return user.exp > Date.now() / 1000
    } else {
      return false
    }
  }

  public register(user: TokenPayload): Observable<any> {
    return this.http.post(`/users/register`, user)
  }

  public login(user: TokenPayload): Observable<any> {
    const base = this.http.post(`http://localhost:3000/users/login`, user)

    const request = base.pipe(
      map((data: TokenResponse) => {
        if (data.token) {
          this.saveToken(data.token)
        }
        return data
      })
    )

    return request
  }

  public profile(): Observable<any> {
    return this.http.get(`http://localhost:3000/users/profile`, {
      headers: { Authorization: ` ${this.getToken()}` }
    })
  }

  public profileEdit(profile: User): Observable<any> {
    return this.http.put(`http://localhost:3000/users/profile-edit/${profile.id}`, profile)
  }

  public passwordEdit(password: Password): Observable<any> {
    return this.http.put(`http://localhost:3000/users/profile-edit/${password.id}`, password)
  }

  public status(): Observable<any> {
    return this.http.get(`http://localhost:3000/devices`, {
      headers: { Authorization: ` ${this.getToken()}` }
    })
  }

  public plants(): Observable<any> {
    return this.http.get(`http://localhost:3000/plants`, {
      headers: { Authorization: ` ${this.getToken()}` }
    })
  }

  public logout(): void {
    this.token = ''
    window.localStorage.removeItem('usertoken')
    this.router.navigateByUrl('/')
  }

  public remove(device: DeviceDetails): Observable<any> {
    return this.http.put(`http://localhost:3000/devices/remove/${device.d_id}`, device)
  }


  public submit(form): Observable<any> {
    return this.http.put(`http://localhost:3000/devices/submit/${form.d_id}`, form)
  }
}
