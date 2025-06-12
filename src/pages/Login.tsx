import React, { useState } from 'react';

import {
  User, Phone, Lock, Mail, Calendar,
  Briefcase, MoveLeft, MoveRight
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLogin, useRegister } from '@/services';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const Login = () => {
  const navigate = useNavigate();
  const loginMutation = useLogin();
  const registerMutation = useRegister();

  const [loginForm, setLoginForm] = useState({
    phone: '',
    password: '',
  });

  const [registerForm, setRegisterForm] = useState({
    username: '',
    first_name: '',
    last_name: '',
    phone: '',
    password: '',
    password_confirm: '',
    gender: '',
    email: '',
    birthdate: '',
    job: ''
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    loginMutation.mutate(loginForm);
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (registerForm.password !== registerForm.password_confirm) {
      alert("Les mots de passe ne correspondent pas");
      return;
    }
    registerMutation.mutate(registerForm);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-between">
            <MoveLeft onClick={() => navigate(-1)} className="cursor-pointer" />
            <MoveRight onClick={() => navigate("/profile")} className="cursor-pointer" />
          </div>
          <CardTitle className="text-2xl font-bold text-[#e83e8c]">Innov RDV</CardTitle>
          <p className="text-gray-600">Votre plateforme de rendez-vous médical</p>
        </CardHeader>

        <CardContent>
          <Tabs defaultValue="login">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Connexion</TabsTrigger>
              <TabsTrigger value="register">Inscription</TabsTrigger>
            </TabsList>

            {/* Connexion */}
            <TabsContent value="login">
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <Label htmlFor="phone">Téléphone</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="phone"
                      value={loginForm.phone}
                      onChange={(e) => setLoginForm({ ...loginForm, phone: e.target.value })}
                      required
                      className="pl-10"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="password">Mot de passe</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="password"
                      type="password"
                      value={loginForm.password}
                      onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                      required
                      className="pl-10"
                    />
                  </div>
                </div>
                <Button type="submit" disabled={loginMutation.isPending} className="w-full bg-gradient-to-r from-[#e83e8c] to-green-500">
                  {loginMutation.isPending ? "Connexion..." : "Se connecter"}
                </Button>
              </form>
            </TabsContent>

            {/* Inscription */}
            <TabsContent value="register">
              <form onSubmit={handleRegister} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <InputWithLabel label="Nom" value={registerForm.last_name} onChange={(v) => setRegisterForm({ ...registerForm, last_name: v })} />
                  <InputWithLabel label="Prénoms" value={registerForm.first_name} onChange={(v) => setRegisterForm({ ...registerForm, first_name: v })} />
                </div>

                <InputWithLabel label="Nom d'utilisateur" value={registerForm.username} onChange={(v) => setRegisterForm({ ...registerForm, username: v })} />
                <InputWithLabel label="Téléphone" value={registerForm.phone} onChange={(v) => setRegisterForm({ ...registerForm, phone: v })} icon={<Phone />} />
                <InputWithLabel label="Email" value={registerForm.email} onChange={(v) => setRegisterForm({ ...registerForm, email: v })} icon={<Mail />} type="email" />
                
                <Label>Sexe</Label>
                <Select value={registerForm.gender} onValueChange={(v) => setRegisterForm({ ...registerForm, gender: v })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner le sexe" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="masculin">Masculin</SelectItem>
                    <SelectItem value="feminin">Féminin</SelectItem>
                  </SelectContent>
                </Select>

                <InputWithLabel label="Date de naissance" type="date" value={registerForm.birthdate} onChange={(v) => setRegisterForm({ ...registerForm, birthdate: v })} icon={<Calendar />} />
                <InputWithLabel label="Profession" value={registerForm.job} onChange={(v) => setRegisterForm({ ...registerForm, job: v })} icon={<Briefcase />} />
                <InputWithLabel label="Mot de passe" type="password" value={registerForm.password} onChange={(v) => setRegisterForm({ ...registerForm, password: v })} icon={<Lock />} />
                <InputWithLabel label="Confirmer le mot de passe" type="password" value={registerForm.password_confirm} onChange={(v) => setRegisterForm({ ...registerForm, password_confirm: v })} icon={<Lock />} />

                <Button type="submit" disabled={registerMutation.isPending} className="w-full bg-gradient-to-r from-green-500 to-[#e83e8c]">
                  {registerMutation.isPending ? "Inscription..." : "S'inscrire"}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;

const InputWithLabel = ({
  label,
  value,
  onChange,
  icon,
  type = "text"
}: {
  label: string;
  value: string;
  onChange: (val: string) => void;
  icon?: React.ReactNode;
  type?: string;
}) => (
  <div className="space-y-2">
    <Label>{label}</Label>
    <div className="relative">
      {icon && <div className="absolute left-3 top-3">{icon}</div>}
      <Input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={icon ? "pl-10" : ""}
        required
      />
    </div>
  </div>
);
