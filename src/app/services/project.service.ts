import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface Project {
    id: number;
    name: string;
    status: string;
    tasks: { status: string, desc: string }[];
    focus: string;
  }
  
  @Injectable({
    providedIn: 'root'
  })
  export class ProjectService {
    private projects: Project[] = [
      { id: 1, name: 'Project A', status: 'In Progress', tasks: [], focus: '' },
      { id: 2, name: 'Project B', status: 'Completed', tasks: [], focus: '' }
    ];
  
    getProjects(): Observable<Project[]> {
      return of(this.projects).pipe(
        catchError(() => of([]))
      );
    }
  
    getProject(id: number): Observable<Project | undefined> {
      return of(this.projects.find(project => project.id === id)).pipe(
        catchError(() => of(undefined))
      );
    }
  
    updateProject(id: number, project: Project): Observable<boolean> {
      const index = this.projects.findIndex(p => p.id === id);
      if (index !== -1) {
        this.projects[index] = project;
        return of(true).pipe(
          catchError(() => of(false))
        );
      }
      return of(false).pipe(
        catchError(() => of(false))
      );
    }
  }